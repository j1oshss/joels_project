using Facebook;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine;

public sealed class FB : ScriptableObject
{
    public static Facebook.InitDelegate OnInitComplete;
    public static Facebook.HideUnityDelegate OnHideUnity;

    private static IFacebook facebook;
    private static string authResponse;
    private static bool isInitCalled = false;

    static IFacebook FacebookImpl
    {
        get
        {
            if (facebook == null)
            {
                throw new NullReferenceException("Facebook object is not yet loaded.  Did you call FB.Init()?");
            }
            return facebook;
        }
    }

    public static string AppId { get { return FBSettings.AppId; } }
    public static string UserId 
    { 
        get 
        {
            return (facebook != null) ? facebook.UserId : ""; 
        } 
    }
    public static string AccessToken 
    {
        get 
        { 
            return (facebook != null) ? facebook.AccessToken : ""; 
        } 
    }

    public static bool IsLoggedIn
    {
        get
        {
            return (facebook != null) ? facebook.IsLoggedIn : false;
        }
    }

    #region Init
    /**
     * onInitComplete - Delegate is called when FB.Init() finished initializing everything.
     *                  By passing in a delegate you can find out when you can safely call the other methods.
     */
    public static void Init(Facebook.InitDelegate onInitComplete, Facebook.HideUnityDelegate onHideUnity = null, string authResponse = null)
    {
        if (!isInitCalled)
        {
            FB.authResponse = authResponse;
            FB.OnInitComplete = onInitComplete;
            FB.OnHideUnity = onHideUnity;

            FbDebug.Log(String.Format("Using SDK {0}, Build {1}", FBBuildVersionAttribute.SDKVersion, FBBuildVersionAttribute.GetBuildVersionOfType(typeof(IFacebook))));

#if UNITY_EDITOR
            FbDebug.Log("Creating Editor version of Facebook object...");
            FBComponentFactory.GetComponent<EditorFacebookLoader>();
#elif UNITY_WEBPLAYER
            FbDebug.Log("Creating Webplayer version of Facebook object...");
            FBComponentFactory.GetComponent<CanvasFacebookLoader>();
#elif UNITY_IOS
            FbDebug.Log("Creating iOS version of Facebook object...");
            FBComponentFactory.GetComponent<IOSFacebookLoader>();
#elif UNITY_ANDROID
            FbDebug.Log("Creating Android version of Facebook object...");
            FBComponentFactory.GetComponent<AndroidFacebookLoader>();
#else
            throw new NotImplementedException("Facebook API does not yet support this platform");
#endif
            FB.isInitCalled = true;
            return;
        }

        FbDebug.Warn("FB.Init() has already been called.  You only need to call this once and only once.");
		
		// Init again if possible just in case something bad actually happened.
		if (FacebookImpl != null) {
			OnDllLoaded();
		}
    }

    private static void OnDllLoaded()
    {
        FbDebug.Log("Finished loading Facebook dll. Build " + FBBuildVersionAttribute.GetBuildVersionOfType(FacebookImpl.GetType()));
        FacebookImpl.Init(
            OnInitComplete,
            FBSettings.AppId,
            FBSettings.Cookie,
            FBSettings.Logging,
            FBSettings.Status,
            FBSettings.Xfbml,
            FBSettings.ChannelUrl,
            authResponse,
            FBSettings.FrictionlessRequests,
            OnHideUnity
        );
    }
    #endregion

    public static void Login(string scope = "", FacebookDelegate callback = null)
    {
        FacebookImpl.Login(scope, callback);
    }

    public static void Logout()
    {
        FacebookImpl.Logout();
    }

    public static void AppRequest(
            string message,
            string[] to = null,
            string filters = "",
            string[] excludeIds = null,
            int? maxRecipients = null,
            string data = "",
            string title = "",
            FacebookDelegate callback = null)
    {
        FacebookImpl.AppRequest(message, to, filters, excludeIds, maxRecipients, data, title, callback);
    }

    public static void Feed(
            string toId = "",
            string link = "",
            string linkName = "",
            string linkCaption = "",
            string linkDescription = "",
            string picture = "",
            string mediaSource = "",
            string actionName = "",
            string actionLink = "",
            string reference = "",
            Dictionary<string, string[]> properties = null,
            FacebookDelegate callback = null)
    {
        FacebookImpl.FeedRequest(toId, link, linkName, linkCaption, linkDescription, picture, mediaSource, actionName, actionLink, reference, properties, callback);
    }

    public static void API(string query, HttpMethod method, FacebookDelegate callback = null, Dictionary<string, string> formData = null)
    {
        FacebookImpl.API(query, method, formData, callback);
    }

    public static void GetAuthResponse(FacebookDelegate callback = null)
    {
        FacebookImpl.GetAuthResponse(callback);
    }

    public static void PublishInstall(FacebookDelegate callback = null)
    {
        FacebookImpl.PublishInstall(AppId, callback);
    }

    #region Canvas-Only Implemented Methods
    public sealed class Canvas
    {
        public static void Pay(
            string product,
            string action = "purchaseitem", 
            int quantity = 1,
            int? quantityMin = null,
            int? quantityMax = null,
            string requestId = null,
            string pricepointId = null,
            string testCurrency = null,
            FacebookDelegate callback = null)
        {
            FacebookImpl.Pay(product, action, quantity, quantityMin, quantityMax, requestId, pricepointId, testCurrency, callback);
        }
    }
    #endregion

    #region Facebook Loader Class
    public abstract class RemoteFacebookLoader : MonoBehaviour
    {
        public delegate void LoadedDllCallback(IFacebook fb);

        private const string facebookNamespace = "Facebook.";

        private const int maxRetryLoadCount = 3;
        private static int retryLoadCount = 0;

        public static IEnumerator LoadFacebookClass(string className, LoadedDllCallback callback)
        {
            var url = string.Format(IntegratedPluginCanvasLocation.DllUrl, className);
            FbDebug.Log("Loading " + className + " from: " + url);
            var www = new WWW(url);
            yield return www;

            if (www.error != null)
            {
                FbDebug.Error(www.error);
                if (retryLoadCount < maxRetryLoadCount)
                {
                    ++retryLoadCount;
#if UNITY_WEBPLAYER
                    FBComponentFactory.AddComponent<CanvasFacebookLoader>();
#endif
                }
                www.Dispose();
                yield break;
            }

            var assembly = Security.LoadAndVerifyAssembly(www.bytes);
            if (assembly == null)
            {
                FbDebug.Error("Could not securely load assembly from " + url);
                www.Dispose();
                yield break;
            }

            var facebookClass = assembly.GetType(facebookNamespace + className);
            if (facebookClass == null)
            {
                FbDebug.Error(className + " not found in assembly!");
                www.Dispose();
                yield break;
            }

            // load the Facebook component into the gameobject
            var fb = (IFacebook)typeof(FBComponentFactory)
                                            .GetMethod("GetComponent")
                                            .MakeGenericMethod(facebookClass)
                                            .Invoke(null, new object[1] { IfNotExist.AddNew });

            if (fb == null)
            {
                FbDebug.Error(className + " couldn't be created.");
                www.Dispose();
                yield break;
            }
            
            callback(fb);
            www.Dispose();
        }

        protected abstract string className { get; }

        IEnumerator Start()
        {
            var loader = LoadFacebookClass(className, OnDllLoaded);
            while (loader != null && loader.MoveNext())
            {
                yield return loader.Current;
            }
            Destroy(this);
        }

        private void OnDllLoaded(IFacebook fb)
        {
            FB.facebook = fb;
            FB.OnDllLoaded();
        }
    }

    public abstract class CompiledFacebookLoader : MonoBehaviour
    {
        protected abstract IFacebook fb { get; }

        void Start()
        {
            FB.facebook = fb;
            FB.OnDllLoaded();
            Destroy(this);
        }
    }
    #endregion
}
