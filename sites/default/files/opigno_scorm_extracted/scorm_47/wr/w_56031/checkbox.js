var handle
var evtEmitter
var total
var myVarNameList
var myLabels
var varHandle;
var eventDisp;
var cpInterface;
var varValue;

var isResponsiveProject = false;
var mainCPNamespace;
var evtHandle;

var movieWidth;
var movieHeight;

var width
var height
var scalefont = "false";

var contentStylessize;
var buttonStylessize;
var headerStylessize;
var instStylessize;

var iframewidth;
var iframeheight;

checkbox1 = {
	onLoad: function()
	{
		if ( ! this.captivate )
			return;
					handle = this.captivate.CPMovieHandle;
					evtEmitter =  handle.getCPAPIEventEmitter();
					cpInterface = handle.getCPAPIInterface();
		//if(handle.isWidgetVisible() == true)
		//{
		this.movieProps = this.captivate.CPMovieHandle.getMovieProps();
		if ( ! this.movieProps )
			return;
		varHandle = this.movieProps.variablesHandle;
		eventDisp = this.movieProps.eventDispatcher;
		mainCPNamespace = this.movieProps.getCpHandle();
		isResponsiveProject = mainCPNamespace.responsive;
		this.xmlStr = this.captivate.CPMovieHandle.widgetParams();
		this.myVarName;
		this.direction = '';
		this.movieWidth = this.movieProps.contentWidth;
		this.movieHeight = this.movieProps.contentHeight;
		this.correctString = '';
		this.fontName;
		this.styleInfo;
		this.sizeInfo;
		var size = this.OpenAjax.getSize();
        width = size.width;
        height = size.height;
		this.boldInfo;
		this.underlineInfo;
		this.italicInfo;
		this.nohighlight;
		this.textColorInfo;
		this.highlightColorInfo;
		
		movieWidth = parseInt(size.width.split("px")[0]);
        movieHeight = parseInt(size.height.split("px")[0]);
		
		this.updateData();
		this.doUpdate();
		
		//varValue = cpInterface.getVariableValue("myVarName1");
		//varHandChangedFull();
		//cpInterface.setVariableValue("myVarName1","hello");
		eventDisp.addEventListener(eventDisp.VARIABLECHANGEDEVENT,varHandChangedFull,false)
		
		//Captivate Event listener
		eventDisp.addEventListener(mainCPNamespace.WINDOWRESIZECOMPLETEDEVENT,updateSizeNPositionOnResizeComplete, false );
		eventDisp.addEventListener(mainCPNamespace.ORIENTATIONCHANGECOMPLETEDEVENT,updateSizeNPositionOnResizeComplete, false );
		
		// var that = this;
		// this.timerVar = setInterval(function (){ 
		// 	console.log(that.varHandle["cpInfoCurrentFrame"]);
		// 	if(that.varHandle["cpInfoCurrentFrame"] >= 2)
		// 	{
		// 		that.movieProps.getCpHandle().movie.pause(that.movieProps.getCpHandle().ReasonForPause.INTERACTIVE_ITEM);
		// 	 	clearInterval(that.timerVar);	
		// 	}
		// },Math.floor(1000/this.varHandle["cpInfoFPS"]));
		this.bindEvents();
		//}
	},

	updateData: function()
	{
		var result = jQuery.parseXML( this.xmlStr );
		console.log(result)
		var resultDoc = jQuery( result );
		var strProp = resultDoc.find( '#dataXML' ).find('string').text();
		this.nohighlight = resultDoc.find( '#nohighlight' ).find('string').text()
		
		var getscalefont = resultDoc.find('#scaleFonts');
        if (getscalefont){
            if (getscalefont.find('string')){
                scalefont = getscalefont.find('string').text();
            }
        }
		
		var userInformation = $(strProp).find('userdata');
		if(userInformation)
		{
		
			myVarNameList = userInformation.attr('varnames').split(',');
			this.direction = userInformation.attr('direction');
			myLabels = userInformation.attr('labels').split(',');
			total = myLabels.length;
			if(this.direction == "vertical"){
				this.correctString += '<ol>'
				for(i = 0 ;i < total; i++){
					this.correctString += '<li><input type="checkbox" id="' + "myCheckBox"+i +'" name="myCheckBox" value="' + myVarNameList[i] + '" ><label>' + myLabels[i] + '</label></input></li>';
					try{
						evtEmitter.removeEventListener("CPAPI_VARIABLEVALUECHANGED",varHandChanged,myVarNameList[i])
					}catch(e){
					}
					evtEmitter.addEventListener("CPAPI_VARIABLEVALUECHANGED",varHandChanged,myVarNameList[i])
					
				}
				this.correctString += '</ol>'
			}else{
				for(i = 0 ;i < total; i++){
					this.correctString += '<input type="checkbox" id="' + "myCheckBox"+i +'" name="myCheckBox" value="' + myVarNameList[i] + '" ><label>' + myLabels[i] + '</label></input>';
					try{
						evtEmitter.removeEventListener("CPAPI_VARIABLEVALUECHANGED",varHandChanged,myVarNameList[i])
					}catch(e){
					}
					evtEmitter.addEventListener("CPAPI_VARIABLEVALUECHANGED",varHandChanged,myVarNameList[i])
				}
			}
		}
		var styleInformation = $(strProp).find('textProperties');
		
		if(styleInformation)
		{
			this.fontName = styleInformation.find('font').attr('face');
			this.styleInfo = styleInformation.find('font').attr('style');
			this.sizeInfo = styleInformation.find('font').attr('size');
			this.boldInfo = styleInformation.find('textDecoration').attr('bold');
			this.underlineInfo = styleInformation.find('textDecoration').attr('underline');
			this.italicInfo = styleInformation.find('textDecoration').attr('italic');
			this.textColorInfo = styleInformation.find('color').attr('textColor');
			
			contentStylessize = this.sizeInfo;
			
			if(this.nohighlight == "false")
			this.highlightColorInfo = styleInformation.find('color').attr('highlightColor');
			
		}

		var allWidgets = window.parent.document.getElementsByClassName("cp-widget");
		var myFrameName = window.name;
		/*for(i=0;i<allWidgets.length;i++)
		{
			var tempFrame =allWidgets[i].getElementsByTagName("iframe");
			for(var j=0;j<tempFrame.length;j++)
			{
			if(tempFrame[j].id == myFrameName)
				{	
					if(this.direction == "horizontal")
					allWidgets[i].style.width = (this.movieWidth - Number(allWidgets[0].style.left.replace("px",""))) + "px";
					if(this.direction == "vertical")
					allWidgets[i].style.height = (this.movieHeight - Number(allWidgets[0].style.top.replace("px",""))) + "px";
					i=allWidgets.length;
					break;}
			}
		}*/

	},
	
	doUpdate: function() 
	{
		
		for(i=0;i<window.parent.document.getElementsByClassName("cp-widget").length;i++){
			//console.log(window.parent.document.getElementsByClassName("cp-widget")[i].children[0].children[0],"saasd")
			if(window.parent.document.getElementsByClassName("cp-widget")[i].children[0].children[0].contentDocument.getElementById("checkboxwdgt") != null){
				myFrameName = window.name;
				myWidgetiFrame = window.parent.document.getElementById(window.name);
				iframewidth = String(myWidgetiFrame.style.width).replace("px","");
				iframeheight = String(myWidgetiFrame.style.height).replace("px","");
				break;
			}
		}
		
		$(myWidgetiFrame).hide();
		
		var elem = document.getElementById( 'description_div' );
		if ( elem ) 
		{
			elem.innerHTML = this.correctString;
			elem.style.fontFamily = this.fontName;
			elem.style.fontSize = this.sizeInfo * "0.06" +"em";
			//elem.style.backgroundColor = getHexColor(this.highlightColorInfo);
			elem.style.color = getHexColor(this.textColorInfo);
			if(this.boldInfo == "true")
				elem.style.bold = true;
			if(this.underlineInfo == "true")
				elem.style.textDecoration = "underline";
			if(this.italicInfo == "true")
				elem.style.fontStyle = "italic";
			if(this.direction == "horizontal")
				elem.style.verticalAlign = "middle";
			//apply background color for elements inside as it will look differently
			var insideElem = elem.getElementsByTagName("label");
			var inputElem = elem.getElementsByTagName("input");
			var sizeHor = 20;
			var sizeVer = 5;
			var maxSizeHor = 0;
			var maxSizeVer = 0;
			for (var i = 0; i < insideElem.length; i++) {
				//insideElem[0].style.cssText = "font-family: 'Arial Black'; background-color: rgb(102, 255, 153); color: rgb(153, 0, 51); vertical-align: middle"
				//insideElem[i].style.cssText = "background-color:" + getHexColor(this.highlightColorInfo) + ";";
				
				if(this.nohighlight == "false"){
					insideElem[i].style.backgroundColor = getHexColor(this.highlightColorInfo);
				}
				
				if(this.direction == "horizontal"){
					inputElem[i].style.marginLeft = "15px";
					insideElem[i].style.verticalAlign = "middle";
					inputElem[i].style.verticalAlign = "middle";
				}else{
					insideElem[i].style.verticalAlign = "top";
					insideElem[i].style.display= "block";
					insideElem[i].style.marginLeft= "25px";
					insideElem[i].style.paddingTop= "2px";
					
					inputElem[i].style.verticalAlign = "top";
					inputElem[i].style.float = "left";
				}
				
				//insideElem[i].style.verticalAlign = "middle";
				//insideElem[i].style.padding = "2px";
				//inputElem[i].style.verticalAlign = "middle";
				//inputElem[i].style.margin = "8px"
	
				if(maxSizeVer < $(insideElem[i]).height())
				{
					maxSizeVer = $(insideElem[i]).height();
				}
				if(maxSizeHor < $(insideElem[i]).width())
				{
					maxSizeHor = $(insideElem[i]).width();
				}
				sizeHor = sizeHor + 20 + $(insideElem[i]).width();
				sizeVer = sizeVer + 20 + $(insideElem[i]).height();
			};

			//resize the div
			var sizeStringHor = sizeHor + 120 + "px";
			var sizeStringVer = sizeVer + 50 + "px";

			var allWidgets = window.parent.document.getElementsByClassName("cp-widget");
			var myFrameName = window.name;
			for(i=0;i<allWidgets.length;i++)
			{
				var tempFrame =allWidgets[i].getElementsByTagName("iframe");
				for(var j=0;j<tempFrame.length;j++)
				{
				if(tempFrame[j].id == myFrameName)
					{	
						if(this.direction == "horizontal"){
							allWidgets[i].style.width = sizeStringHor;
							allWidgets[i].style.height = (maxSizeVer +15) + "px";
						}
						else
						{
							allWidgets[i].style.height = sizeStringVer;
							allWidgets[i].style.width = (maxSizeHor *2) + 100 +"px";
						}
						
						
						i=allWidgets.length;
						break;}
				}
			}
		}
		elem = null;	
		resizeInteraction(width,height);		
	},

	bindEvents: function() 
	{
		var self = this;
		 $('input[name=myCheckBox]:checkbox').live('change', function() { 
		 	if(this.checked)
		 		varHandle[this.value] = this.nextSibling.innerHTML;
		 	else
		 		varHandle[this.value] = "";
		 });
		 
	}
};

function varHandChanged(evt){
	//console.log("running specific check")
	for(i = 0 ;i < total; i++){
		if($('input[value='+myVarNameList[i]+']:checkbox').val() == evt.cpData.varName){
			if(myLabels[i] ==  evt.cpData.newVal){	
				$("#myCheckBox"+i)[0].checked =  true;	
			}else{
				$("#myCheckBox"+i)[0].checked =  false;
			}
		}
	}
}

function varHandChangedFull(){
	//console.log("running first check")
	for(i = 0 ;i < total; i++){
		if(varHandle[myVarNameList[i]] ==  myLabels[i]){	
			$("#myCheckBox"+i)[0].checked =  true;	
		}else{
			$("#myCheckBox"+i)[0].checked =  false;
		}
	}
	eventDisp.removeEventListener(eventDisp.VARIABLECHANGEDEVENT,varHandChangedFull)
}

getHexColor = function(myColor)
{
	var col = myColor.split('x');
	var retString = "#";
	if(col[1].length < 6)
		for(var i = col[1].length;i<6;i++)
			retString = retString+"0";
	return retString + col[1];
}

checkbox = function ()
{
	return checkbox1;
}
	
function updateSizeNPositionOnResizeComplete(){
	resizeInteraction(width,height);
}

function resizeInteraction(thewidth, theheight){
	var scale = 0;
	thewidth = String(thewidth).replace("px","");
	theheight = String(theheight).replace("px","");

	/**********************/
	//Modification made for Presenter same logic holds good for Captivate
	//iframe width and Height
	
	var scaleW = thewidth / (iframewidth);
	var scaleH = theheight/ (iframeheight);
	
	if(scaleW<scaleH){
		scale = scaleW
	}else{
		scale = scaleH
	}
	if(scalefont=="true"){
		//Content font size
			if(thewidth>=1024){
				$("#description_div").css('font-size', contentStylessize+"px");
			}else if(thewidth>= 768){
				var tempNum = Math.round(contentStylessize-2);
				if(tempNum>=12){
					$("#description_div").css('font-size', tempNum+"px");
				}else{
					$("#description_div").css('font-size', "12px");
				}
			}else if(thewidth>= 360){
				$("#description_div").css('font-size', "12px");
			}else{
				$("#description_div").css('font-size', "12px");
			}
			
			var tempcontentStylessize = contentStylessize*scale;
			if(tempcontentStylessize>=12 && tempcontentStylessize<=contentStylessize){
				$("#description_div").css('font-size', tempcontentStylessize+"px");
			}
	}else{
		if(theheight == 350 || thewidth == 320){
			$("#description_div").css('font-size', "12px");
		}
	}
	
	
	/*********************/

	$('#checkboxwdgt').css('width',(iframewidth*scaleW));
	$('#checkboxwdgt').css('height',(iframeheight*scaleH));
	
	$('#description_div').css('width',(iframewidth*scaleW)-10);
	$('#description_div').css('height',(iframeheight*scaleH));
	
	$(myWidgetiFrame).show();
}
