var UserSQL = {  
    //insert:
    queryAll:'select * from HSCARD order by Cdid asc limit ?,?;', 
    queryData:'select count(*) as maxdata from HSCARD;',
    //update:
    //delete:
};
module.exports = UserSQL;