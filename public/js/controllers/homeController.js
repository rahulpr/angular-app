
// controllers
app.controller('homeCtrl', function ($scope, taskFactory, taskService, $http) {

    var apiUrl = 'http://localhost/lar1/public';
    var vm = this;

    $scope.alert = null;

    // default array
    vm.taskArr = [];
    /*vm.taskArr = [
     {
     task: 'Learn Angular Basics',
     done: true
     },
     {
     task: 'Make basic idea',
     done: false
     }
     ];*/

    /*
     *  list all tasks from Database
     */
    function listTasks() {
        $http.get(apiUrl + '/listtask').then(function (sucRes) {
            vm.taskArr = sucRes.data.data;
            console.log('Got response');
        }, function (errRes) {
            $scope.alert = {
                type: 'danger',
                msg: 'Something wrong occured'
            };
        });
    }

    listTasks();

    vm.addTodo = function () {

        if (vm.taskname) {

            var taskObj = {
                task: vm.taskname,
                done: false
            };

            // API call for insertion
            $http.post(apiUrl + '/addtask', taskObj).then(function successCallback(response) {

                vm.taskArr.push(taskObj);
                vm.taskname = ''; // clear textbox

                $scope.alert = {
                    type: 'success',
                    msg: response.data.message
                };

            }, function errorCallback(response) {

                console.log('Error');

                $scope.alert = {
                    type: 'danger',
                    msg: response.data.message.task[0]
                };
            });

        } else {

            $scope.alert = {
                type: 'danger',
                msg: 'Field can not be empty!'
            };
        }
    };

    vm.removeTask = function () {

        var oldArr = vm.taskArr;
        vm.taskArr = [];
        var removeIds = [];

        oldArr.forEach(function (tsk) {

            if (!tsk.done) { // pending task
                vm.taskArr.push(tsk);
            } else {
                // remove completed tasks
                removeIds.push(tsk.id);
            }

        });

        console.log(removeIds);

        $http.post(apiUrl + '/removetask', {ids: removeIds}).then(function (sucRes) {
        }, function (errRes) {
        });

    };

    vm.testFactory = function () {
        taskFactory.factoryFunc();
    };

    vm.testService = function () {
        taskService.serviceFunc();
    };


    $scope.closeAlert = function () {
        $scope.alert = null;
    };

});


app.controller('AlertDemoCtrl', function ($scope) {
    $scope.alerts = [
        {type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'},
        {type: 'success', msg: 'Well done! You successfully read this important alert message.'}
    ];

    $scope.addAlert = function () {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});

