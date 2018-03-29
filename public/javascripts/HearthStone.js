var app = angular.module('HearthStone', []);  
app.controller('onloadCtrl', function ($scope, $http) {   

    $scope.curr = 1;  //当前页数
    $scope.count = 5,  //最多显示的页数
    $scope.pagedata = 5,  //每页最多显示的卡牌数
    
// 20180324 Mkhitaryan
    $http.get("http://localhost:3000/HearthStone/list",{params:{currentpage:'initall'}})
    .success(function (Data) {  
        console.log(Data);
        $scope.all = parseInt(Data[0].maxdata / parseInt($scope.pagedata))+1; //总页数 
        console.log($scope.all);
        console.log($scope.curr);
        console.log($scope.count);
        $scope.page = getRange($scope.curr, $scope.all, $scope.count);
    });


    //页码点击事件
    $scope.pageClick = function (page) {
        if (page == '«') {
            page = 1;
        } else if (page == '»') {
            page = $scope.all;
        }
        if (page < 1) page = 1;
        else if (page > $scope.all) page = $scope.all;
        //点击相同的页数 不执行点击事件
        if (page == $scope.curr) return;
        $scope.curr = page;
        console.log("curr="+page);
        $scope.page = getRange($scope.curr, $scope.all, $scope.count);
    };

    //监听SQL
    $scope.$watch('curr', function(){   
        $http.get("http://localhost:3000/HearthStone/list",{params:{currentpage:$scope.curr, pagedata:$scope.pagedata}})
        .success(function (Data) {
            console.log(Data);  
            $scope.names = Data;  
        });
    });

    //返回页数范围（用来遍历）
    function getRange(curr, all, count) {
        //计算显示的页数
        curr = parseInt(curr);
        all = parseInt(all);
        count = parseInt(count);
        var from = curr - parseInt(count / 2);
        var to = curr + parseInt(count / 2) + (count % 2) - 1;
        //显示的页数容处理
        if (from <= 0) {
            from = 1;
            to = from + count - 1;
            if (to > all) {
                to = all;
            }
        }
        if (to > all) {
            to = all;
            from = to - count + 1;
            if (from <= 0) {
                from = 1;
            }
        }
        var range = [];
        for (var i = from; i <= to; i++) {
            range.push(i);
        }
        range.push('»');
        range.unshift('«');
        return range;
    }

//     //创建当前正在编辑的对象  
//     $scope.hearthstone = {};  
//     $scope.x = $scope.names;
//     $scope.researchHearth = function (x) {  
//         $scope.research = x;  
//     };  
//     $scope.deleteHearth = function (x) {  
//         $scope.x.splice($scope.names.indexOf(x), 1);  
//     };  
//     $scope.addHearth = function (x) {  
//         $scope.Hearth.push(x);  
//     };  
//     $scope.isSelected = function (currentrow) {  
//         console.info(currentrow);  
//         return currentrow;  
//     }  
//     $scope.editHearth = function () {  
//         var now = $scope.isSelected();  
//         console.info(now);  
//     };  
// });

// app.controller('addCtrl', function ($scope, $http) {  
//     $http.get('data/AddInfo.json')  
//     .success(function (Source) {  
//         $scope.datas = Source;  
//         console.info(Source);  
//     });      
});
