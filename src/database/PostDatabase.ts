import { LikeDislikeDB, PostDB, PostDBWithCreatorName, POST_LIKES } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import UserDatabase from "./UserDatabase";

export class PostsDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_LIKES_DISLIKES_POSTS = "likes_dislikes_posts"

    public insertPost = async (
    postDB: PostDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .insert(postDB)
}
    public getPostsWithCreatorName = async (): Promise<PostDBWithCreatorName[]> => {
    const postsDB = await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .select(
        `${PostsDatabase.TABLE_POSTS}.id`,
        `${PostsDatabase.TABLE_POSTS}.creator_id`,
        `${PostsDatabase.TABLE_POSTS}.content`,
        `${PostsDatabase.TABLE_POSTS}.likes`,
        `${PostsDatabase.TABLE_POSTS}.dislikes`,
        `${PostsDatabase.TABLE_POSTS}.comments`,
        `${PostsDatabase.TABLE_POSTS}.created_at`,
        `${PostsDatabase.TABLE_POSTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.username as creator_name`
      ).join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostsDatabase.TABLE_POSTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`)

    return postsDB as PostDBWithCreatorName[]
}
    public findPostWithCreatorNameById = async (id: string): Promise<PostDBWithCreatorName | undefined> => {
    const [postsDB] = await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .select(
        `${PostsDatabase.TABLE_POSTS}.id`,
        `${PostsDatabase.TABLE_POSTS}.creator_id`,
        `${PostsDatabase.TABLE_POSTS}.content`,
        `${PostsDatabase.TABLE_POSTS}.likes`,
        `${PostsDatabase.TABLE_POSTS}.dislikes`,
        `${PostsDatabase.TABLE_POSTS}.created_at`,
        `${PostsDatabase.TABLE_POSTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.username as creator_name`
      ).join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostsDatabase.TABLE_POSTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`)
      .where({ [`${PostsDatabase.TABLE_POSTS}.id`]: id })


    return postsDB as PostDBWithCreatorName | undefined
}
    public findLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<POST_LIKES | undefined> => {
    const [result] = await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES_POSTS)
      .select()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })

    if(result === undefined){
      return undefined
    } else if(result.like === 1) {
      return POST_LIKES.LIKED
    } else {
      return POST_LIKES.DISLIKED
    }
}
    public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES_POSTS)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })

}
    public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB) => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES_POSTS)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
}
    public insertLikeDislike = async (likeDislikeDB: LikeDislikeDB) => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_LIKES_DISLIKES_POSTS)
      .insert(likeDislikeDB)
}
    public updatePost = async (postDB: PostDB) => {
    await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .update(postDB)
      .where({ id: postDB.id })
}
    public updateCommentNumber = async (postId:string): Promise<void> => {
    const [postDB]: PostDB[] = await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .where({ id: postId })

      await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .update({
        comments: postDB.comments + 1
      })
      .where({ id: postId }) 
}
}
