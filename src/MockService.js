var FieldService =  {
	saveField: function (fieldJson) {
		// Add the code here to call the API (or temporarily, just log fieldJson to the console)
        this.postData(fieldJson)
	},

    postData: async (fieldJson) => {
        const response = await fetch('http://www.mocky.io/v2/566061f21200008e3aabd919', {
          method: 'POST',
          // headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'application/json'
          // },
          body: JSON.stringify(fieldJson)
        }); 
        console.log(response);
      }
      
}

export default FieldService;