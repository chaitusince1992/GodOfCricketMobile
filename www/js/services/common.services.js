godOfCricketApp.service('commonServices', ['$q', '$http', function ($q, $http) {
    self = this;
    self.getSachinDataFromCSV = function (callbackSuccess) {
        $http({
            url: 'sachin.csv',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function success(response) {
            //        console.log(response.data);
            //        console.log(response.data.split('\n'));
            var eachRow = response.data.split('\n');
            var parsedEachRow = [];
            for (i = 1; i < eachRow.length - 1; i++) {
                var parsedEachRowObject = new Object();
                for (j = 0; j < eachRow[0].split(',').length; j++) {
                    parsedEachRowObject[eachRow[0].split(',')[j]] = eachRow[i].split(',')[j];
                }
                parsedEachRow.push(parsedEachRowObject);
            }
            console.log("csv parsed successfully");
            callbackSuccess(parsedEachRow);
        });
    };
    self.getSachinDataFromCSV(function(res) {
        console.log(res);
    })
}]);

