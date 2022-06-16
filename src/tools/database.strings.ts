export const TABLES_DB_STRING = {
    userTable: 't2_appuser',
    postTable: 't2_post',
    commentTable: 't2_comment',
}
export const RELATIONS_DB_STRING = {
    userModelFK: 'author_id',
    userModelAlias: 'user',
    
    postModelFK: 'post_id',
    postModelAlias: 'posts',
    
    commentModelFk: 'comment_id',
    commentModelAlias: 'comments',
}