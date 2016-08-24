export const areArraysEqual = (a, b) => {
    if (!a || !b) return false;

    if (a.length != b.length) return false;

    for (var i = 0, length = a.length; i < length; i++) {
        if (a[i] != b[i]) return false;
    }
    return true;
}

export const topDifference = (element, container) => {
    return topFromWindow(element) - topFromWindow(container);
}

export const topFromWindow = (element) => {
    if (!element || element === window) return 0;
    return element.offsetTop + topFromWindow(element.offsetParent);
}

export const viewTop = (element) => {
    var viewTop;
    if (element === window) {
        viewTop = window.pageYOffset;
        if (viewTop == null) viewTop = document.documentElement.scrollTop;
        if (viewTop == null) viewTop = document.body.scrollTop;
    }
    else {
        viewTop = element.scrollY;
        if (viewTop == null) viewTop = element.scrollTop;
    }
    return (viewTop == null) ? 0 : viewTop;
}

export const debounce = (func, wait, immediate) => {
    if (!wait) return func;

	var timeout;

	return function() {
		let context = this, args = arguments;

		const later = function() {
			timeout = null;

			if (!immediate) func.apply(context, args);
		};

		var callNow = immediate && !timeout;

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) func.apply(context, args);
	};
}

