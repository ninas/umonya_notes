var animation = Array();

function animate_loop() {
	for (A in animation) {
		a = animation[A];
		if (a.state > 0) {
			a.delay--;
			if (a.delay == 0) {
				advance(a.seqname);
				a.delay = a.maxdelay;
			}
		}
	}
	setTimeout(animate_loop,200);
}

function advance(seqname) {
	frame = document.getElementById(seqname);
	a = animation[seqname];
	a.frame++;
	if (a.frame >= a.numframes) {
		if (a.state == 2) {
			a.frame = 0;
		} else {
			a.frame = a.numframes-1;
			a.state = 0;
		}
	}
	frame.src = a.image[a.frame].src;
	frame.style.display = 'none';
	frame.style.display = 'inline';
}

function animate(seqname, numframes, delay) {
	animation[seqname] = Object();
	animation[seqname].seqname = seqname;
	animation[seqname].image = Array();
	animation[seqname].frame = 0;
	animation[seqname].maxdelay = delay;
	animation[seqname].delay = delay;
	animation[seqname].numframes = numframes;
	animation[seqname].state = 0; //0: stopped, 1: autoplaying, 2: looped
	for (i = 0; i < numframes; i++) {
		animation[seqname].image[i] = new Image();
		animation[seqname].image[i].src = 'images/'+seqname+(i+1)+'.png';
	}
	document.write("<center><img src='images/"+seqname+"1.png' id='"+seqname+"' class='tree' /><br />");
	document.write("<img src='images/rewind.png' class='anibutton' onclick='animation[\""+seqname+"\"].frame = -1; advance(\""+seqname+"\");'>&nbsp;");
	document.write("<img src='images/play.png'   class='anibutton' onclick='animation[\""+seqname+"\"].state = 1;'>&nbsp;");
	document.write("<img src='images/stop.png'   class='anibutton' onclick='animation[\""+seqname+"\"].state = 0;'>&nbsp;");
	document.write("<img src='images/step.png'   class='anibutton' onclick='advance(\""+seqname+"\");'>&nbsp;");
	document.write("<img src='images/loop.png'   class='anibutton' onclick='animation[\""+seqname+"\"].state = 2;'>&nbsp;");
	document.write("</center>");
}
