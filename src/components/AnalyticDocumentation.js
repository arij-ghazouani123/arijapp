import React from 'react';

function Documentation() {
  return (
    <div>
      <h1>Android Analytic SDK Documentation</h1>
      <hr />
      <h2>Step 1. Install the SDK</h2>
      <li>Add implementation 'com.mixpanel.android:mixpanel-android:7.+' as a dependency to your build.gradle file.</li>
      <li>
        Once you've updated build.gradle, you can force Android Studio to sync with your new configuration by clicking the Sync Project with Gradle Files icon at the top of the window:
        <br />
        <img src="https://storage.googleapis.com/cdn-mxpnl-com/static/readme/android-sync-gradle.png" alt="Example Image" />
      </li>
      <li>If it cannot find the dependency, you should make sure you've specified mavenCentral() as a repository in build.gradle.</li>
      <li>
        Next, add the following permissions in your AndroidManifest.xml:
        <br />
        <div   style={{ border: '1px solid black', width: '600px' }}>
        
        
           <p>
            <li>&lt;!--Required to allow the application to send events to Mixpanel--&gt;</li>
            <p>&lt;uses-permission android:name="android.permission.INTERNET" /&gt;</p>
            <li>&lt;!--Optional, but recommended so we can send data intelligently based on network conditions--&gt;</li>
            <p>&lt;uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" /&gt;</p>
            <li>&lt;!--Optional, but recommended so events will contain information about bluetooth state--&gt;</li>
            <p>&lt;uses-permission android:name="android.permission.BLUETOOTH"  /&gt;</p>
          
            </p>
        </div>
      </li>
      <h2>2. Track your first event</h2>
      <p>
        You'll need your Project Token for this, which you can get{' '}
        <a href="https://eu.mixpanel.com/project/2957740/app/settings/#project/2957740">here</a>.
      </p>

      <div   style={{ border: '1px solid black', width: '600px' }}>
        
        
           <p>
           <pre>
            ${`import com.mixpanel.android.mpmetrics.MixpanelAPI;

            public class MainActivity extends ActionBarActivity {
              private MixpanelAPI mp;
              
              @Override
              protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
                
                // Replace with your Project Token
                mp = MixpanelAPI.getInstance(this, "YOUR_TOKEN");
              }
            
              private void sendToMixpanel() throws JSONException {
                JSONObject props = new JSONObject();
                props.put("Signup Type", "Referral");
                mp.track("Signed Up", props);
              }
            }`}
          </pre>
          
            </p>
        </div>
    
            <h2>Step 3. Timing Events</h2>
            <p>
            You can track the time it took for an action to occur, such as an image upload or a comment post using   ,
        <a href="http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#timeEvent-java.lang.String-">timeEvent</a>.
        This will mark the "start" of your action, which will be timed until you finish with a track call. The time duration is then recorded in the "Duration" property.
      </p>
      <div   style={{ border: '1px solid black', width: '500px' }}>
        
        
        <p>
        
        <pre>
            ${`MixpanelAPI mixpanel =
    MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);

// start the timer for the event "Image Upload"
mixpanel.timeEvent("Image Upload");

// stop the timer if the imageUpload() method returns true
if(imageUpload()){
    mixpanel.track("Image Upload");
}`}
          </pre>
         </p>
     </div>
     
                  <h2>Export Your Own Events</h2>
                  <div   style={{ border: '1px solid black', width: '600px' }}>
        
        
        <p>
        You can also export  events from the table that contains all your events in your project profile ,
                  and you can for sure choose the type of file that you want to export it ,also you can choose which event you want to export in that to 
                  have a full review
                   </p>
     </div>
                
                   <hr />
    </div>
  );
}

export default Documentation;
