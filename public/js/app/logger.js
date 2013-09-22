define({

	currentGroup: null,

	log: function (group, message) {
		if (message) {
			if (group !== this.currentGroup) {
				console.groupEnd();
				console.group(group);
				this.currentGroup = group;
			}
			console.log(message);
		} else {
			message = group;
			console.groupEnd();
			console.log(message);
		}
	}

});