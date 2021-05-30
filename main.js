const REDIRECTS = [
	{
		input: 'intro',
		content: {
			title: 'Foothills Ward Sacrament Meeting',
			subtitle: 'Thank you for joining us today. The stream will begin in a few moments.'
		}
	},
	{
		input: 'sacrament',
		content: {
			title: 'Foothills Ward Sacrament Meeting',
			subtitle: 'The stream will resume shortly, after the sacrament is administered.'
		}
	}
]

function isElement(obj) {
  try {
    return obj instanceof HTMLElement;
  }
  catch(e){
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
}

function toggleVisibility(element) {
	if (isElement(element)) {
		element.classList.toggle('selected');
	}
}

function cycleImages() {
	const images = document.getElementsByClassName('slide-photo');

	toggleVisibility(images[0]);

	let i = 0;

	setInterval(function() {
		console.log(i%images.length);

		toggleVisibility(images[i%(images.length)]);
		toggleVisibility(images[(i+1)%(images.length)]);
		i++;
	}, 12000);
}

function fillTextFields() {
	const params = new URLSearchParams(window.location.search);

	params.forEach((value, key) => {
		element = document.getElementById(key);
		if (element) element.textContent = value;
	});
}

function autoRedirect(items) {
	const pageUrl = new URLSearchParams(window.location.search);
	
	let query = new URLSearchParams();

	items.forEach((redirect) => {
		const {input, content} = redirect;

		if (pageUrl.has(input)) {
			for (const [key, value] of Object.entries(content)) {
				query.append(key, value);
			}

		location.search = query.toString();
		}
	});
}

// Via David Walsh. Find the right method, call on correct element
function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

const body = document.getElementById('body');
// Launch fullscreen for browsers that support it!
//launchFullScreen(document.documentElement); // the whole page
//launchFullScreen(body);

autoRedirect(REDIRECTS);
fillTextFields();
cycleImages();