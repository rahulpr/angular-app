
// factory
app.factory('taskFactory', function () {
    var obj = {};

    obj.factoryFunc = function () {
        console.log('test function in factory');
    };

    return obj;
});

