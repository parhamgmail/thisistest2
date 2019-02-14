/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		console.log(FileTransfer);
		console.log(cordova.file);
		document.getElementById("uploadFile").addEventListener("click", uploadFile);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

/*function uploadFile() {
	   var fileURL = "///storage/emulated/0/DCIM/myFile"
	   var uri = encodeURI("http://posttestserver.com/post.php");
	   var options = new FileUploadOptions();
	   options.fileKey = "file";
	   options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
	   options.mimeType = "text/plain";
	   
	   var headers = {'headerParam':'headerValue'};
	   options.headers = headers;
	   var ft = new FileTransfer();
	   ft.upload(fileURL, uri, onSuccess, onError, options);

	   function onSuccess(r) {
		  console.log("Code = " + r.responseCode);
		  console.log("Response = " + r.response);
		  console.log("Sent = " + r.bytesSent);
	   }

	   function onError(error) {
		  alert("An error has occurred: Code = " + error.code);
		  console.log("upload error source " + error.source);
		  console.log("upload error target " + error.target);
	   }
		
	}
		/*var win = function (r) {
			console.log("Code = " + r.responseCode);
			console.log("Response = " + r.response);
			console.log("Sent = " + r.bytesSent);
		}

		var fail = function (error) {
			alert("An error has occurred: Code = " + error.code);
			console.log("upload error source " + error.source);
			console.log("upload error target " + error.target);
		}

		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.mimeType = "text/plain";

		var params = {};
		params.value1 = "test";
		params.value2 = "param";

		options.params = params;

		var ft = new FileTransfer();
		ft.upload(fileURL, encodeURI("http://some.server.com/upload.php"), win, fail, options);*/
		var datapic;
		function showfile()
		{
			alert("salam");
			alert(document.getElementById('file1').value);
			document.getElementById('file1').innerHTML="<img src='"+document.getElementById('file1').value+"'>";
		}
		function onFileSelected(event) {
		  var selectedFile = event.target.files[0];
		  var reader = new FileReader();

		  var imgtag = document.getElementById("myimage");
		  imgtag.title = selectedFile.name;

		  reader.onload = function(event) {
			imgtag.src = event.target.result;
			alert(imgtag.src);
			datapic=imgtag.src
		  };

		  reader.readAsDataURL(selectedFile);
		}
		
		$("#btnsnd").click(function(){
			alert(datapic);
		  /*$.post("https://www.multijib.ir/test/up.php",
		  {
			pic: datapic
		  },
		  function(data, status){
			alert("Data: " + data + "\nStatus: " + status);
		  });*/
		  $.ajax({
				type: 'POST',
				// make sure you respect the same origin policy with this url:
				// http://en.wikipedia.org/wiki/Same_origin_policy
				url: 'https://www.multijib.ir/test/up.php',
				data: { 
					'pic': datapic
				},
				success: function(msg){
					alert('wow' + msg);
				}
			});
		});
		
		function sendData(data) {
			alert(data);
			data='{"pic":"'+data+'"}';
			alert(data);
		  var XHR = new XMLHttpRequest();
		  var urlEncodedData = "";
		  var urlEncodedDataPairs = [];
		  var name;

		  // Turn the data object into an array of URL-encoded key/value pairs.
		  for(name in data) {
			urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
		  }

		  // Combine the pairs into a single string and replace all %-encoded spaces to 
		  // the '+' character; matches the behaviour of browser form submissions.
		  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

		  // Define what happens on successful data submission
		  XHR.addEventListener('load', function(event) {
			alert('Yeah! Data sent and response loaded.');
		  });

		  // Define what happens in case of error
		  XHR.addEventListener('error', function(event) {
			alert('Oops! Something goes wrong.');
		  });

		  // Set up our request
		  XHR.open('POST', 'https://multijib.ir/test/up.php');

		  // Add the required HTTP header for form data POST requests
		  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		  // Finally, send our data.
		  XHR.send(urlEncodedData);
		}