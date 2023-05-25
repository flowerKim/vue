module.exports = {
  productList: {
    query: `select t1.*, t2.path, t3.category1, t3.category2, t3.category3
        from   t_product t1, t_image t2, t_category t3
        where  t1.id = t2.product_id and t2.type = 1 and t1.category_id = t3.id;`,
  },
  productList1: {
    query: `select * from   t_product`,
  },
  productList2: {
    query: `select t3.*, t4.path 
        from (select t1.*, t2.category1, t2.category2, t2.category3 from   t_product t1, t_category t2 where t1.category_id=t2.id) t3
        left join ( select * from t_image where type=1) t4 on t3.id = t4.product_id;`,
  },
  productDetail_: {
    query: `select t1.*, 
        t2.path, t3.category1, t3.category2, t3.category3
        from   t_product t1, t_image t2, t_category t3
        where  t1.id = ? and t1.id = t2.product_id and t2.type= 3 and t1.category_id = t3.id;`,
  },
  productDetail: {
    query: `select t3.*, t4.path 
        from (select t1.*, t2.category1, t2.category2, t2.category3 from   t_product t1, t_category t2 where t1.category_id=t2.id) t3
        left join ( select * from t_image where type=1) t4 on t3.id = t4.product_id
        where t3.id=?`,
  },
  productMainImages: {
    query: `select * from t_image where product_id = ? and type = 2;`,
  },
  productInsert: {
    query: `insert into 
        t_product set ?`,
  },
  productImageInsert: {
    query: `insert into t_image set ?`,
    // query: `insert into
    // t_image (product_id, type, path)
    // values (?, ?, ?);`
  },
  imageList: {
    query: `select * from t_image where product_id=?`,
  },
  productDelete: {
    query: `delete from t_product where id=?`,
  },
  categoryList: {
    query: `select * from t_category`,
  },
  sellerList: {
    query: `select * from t_seller`,
  },
  signUp: {
    query: `insert into b_user set ? on duplicate key update ?`,
  },
  myUnoInfo: {
    query: `select uno from b_user where uemail=?`,
  },
  boardList: {
    // query: `select t1.*,t2.uname, t2.uemail from   b_list t1
    //         left join b_user t2 on t1.uno=t2.uno
    //         where t1.bstatus=1;`
    query: `select t1.bno,
            t1.btitle,
            t1.bcontent,
            DATE_FORMAT(t1.bcreate_date,'%Y-%m-%d %h:%m:%s') as bcreate_date,
            DATE_FORMAT(t1.bupdate_date,'%Y-%m-%d %h:%m:%s') as bupdate_date,
            t1.bhit,
            t1.bstatus,
            t1.uno,
            t2.uname, 
            t2.uemail
      from  b_list t1
      left join b_user t2 on t1.uno=t2.uno
      where t1.bstatus=1;`,
  },
  boardDetail: {
    query: `select t1.*, t2.uname, t2.uemail,t2.uno 
            from   b_list t1,b_user t2 where t1.uno=t2.uno and t1.bno=?;`,
  },
  boardDetailHit: {
    query: `update b_list
            set    bhit = ?
            where  bno = ?;`,
  },
  boardUpdate: {
    query: `update b_list 
            set    btitle=?, bcontent=?, bupdate_date=current_timestamp() where bno=?;`,
  },
  boardCreate: {
    query: `insert into b_list set ?, bcreate_date=current_timestamp()`,
  },
  boardDelete: {
    query: `delete from b_list where bno=?`,
  },

  boardSearchList: {
    query: `select t1.*,t2.uname, t2.uemail from   b_list t1
            left join b_user t2 on t1.uno=t2.uno
            where t1.bstatus=1 
            and   t1.btitle like concat('%',?,'%')`,
  },

  boardReplyList: {
    // query: `select t1.*,t2.uname from b_reply t1, b_user t2
    // where t1.uno=t2.uno and bno=?
    // order by sort;`,
    query: `select t1.rno
                  ,t1.rcontent
                  ,t1.rdepth
                  ,t1.rpno
                  ,DATE_FORMAT(t1.rcreate_date,'%Y-%m-%d %h:%m:%s') as rcreate_date
                  ,t1.uno
                  ,t1.bno
                  ,t1.sort
                  ,t1.sort2
                  ,t2.uname 
            from b_reply t1, b_user t2
            where t1.uno=t2.uno and bno=?
            order by t1.sort;`,
  },
  boardNewReply: {
    query: `insert into b_reply 
     set         rcontent=?
                ,rcreate_date=current_timestamp()
                ,uno=?
                ,bno=?`,
  },
  boardReplySortUpdate: {
    query: `with a as (
       select max(rno) as last_rno
       from b_reply
       where bno=?
    )
    update b_reply set sort =(select concat(last_rno) from a)
    where rno=(select last_rno from a);
    `,
  },
  replyDelete: {
    query: `delete from b_reply where rno=?`,
  },
  updateReplySort2: {
    query: `update  b_reply  set sort2=? where rno=?`,
  },
  newReplysave: {
    query: `insert into b_reply set ?
    `,
  },
};
