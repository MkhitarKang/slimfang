var UserSQL = {  
    //insert:
    //queryAll:'select * from HSCARD order by Cdid asc limit 0,5',
    queryAll:'select * from HSCARD order by Cdid asc limit ?,?;', 
    //queryAll2:'select * from HSCARD order by Cdid asc limit 0,5;', 
    queryMaxPage:'select count(*) as maxdata from HSCARD;',
    //update:
    //delete:
};
module.exports = UserSQL;