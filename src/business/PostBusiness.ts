import { PostsDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/posts/createPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/posts/getPosts.dto";
import { LikeOrDislikePostInputDTO, LikeOrDislikePostOutputDTO } from "../dtos/posts/likeOrDislikePost.dto";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { LikeDislikeDB, Post, POST_LIKES } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor (
        private postDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}


public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { content, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError("Token Inválido!")
    }

    const id = this.idGenerator.generate()

    const post = new Post(
      id,
      content,
      0,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.id
  )
    const postDB = post.toDBModel()
    await this.postDatabase.insertPost(postDB)

    const output: CreatePostOutputDTO = undefined

    return output
}

public getPosts = async (
  input: GetPostsInputDTO
): Promise<GetPostsOutputDTO> => {
  const { token } = input

  const payload = this.tokenManager.getPayload(token)

  if (!payload) {
      throw new UnauthorizedError("Token inválido!")
  }

  const postsWithCreatorName = await this.postDatabase.getPostsWithCreatorName()

  const posts = postsWithCreatorName
      .map((postsWithCreatorName) => {
          const post = new Post(
              postsWithCreatorName.id,
              postsWithCreatorName.content,
              postsWithCreatorName.likes,
              postsWithCreatorName.dislikes,
              postsWithCreatorName.comments,
              postsWithCreatorName.created_at,
              postsWithCreatorName.updated_at,
              postsWithCreatorName.creator_id,
              postsWithCreatorName.creator_name
          )

          return post.toBusinessModel()
      })

  const output: GetPostsOutputDTO = posts
  return output
}

public likeOrDislikePost = async (
  input: LikeOrDislikePostInputDTO
): Promise<LikeOrDislikePostOutputDTO> => {
  const { token, postId, like } = input

  const payload = this.tokenManager.getPayload(token)

  if (!payload) {
      throw new UnauthorizedError("Token inválido!")
  }

  const postsWithCreatorName = await this.postDatabase.findPostWithCreatorNameById(postId)

  if(!postsWithCreatorName){
      throw new NotFoundError("Post com esta 'id' não existe")
  }

  const post = new Post(
      postsWithCreatorName.id,
      postsWithCreatorName.content,
      postsWithCreatorName.likes,
      postsWithCreatorName.dislikes,
      postsWithCreatorName.comments,
      postsWithCreatorName.created_at,
      postsWithCreatorName.updated_at,
      postsWithCreatorName.creator_id,
      postsWithCreatorName.creator_name
  )

  const likeSqlite = like ? 1 : 0

  const likeDislikeDB: LikeDislikeDB = {
      user_id: payload.id,
      post_id: postId,
      like: likeSqlite
  }

  const likeDislikeExists = await this.postDatabase.findLikeDislike(likeDislikeDB)

  if(likeDislikeExists === POST_LIKES.LIKED){
      if(like === true){
          await this.postDatabase.removeLikeDislike(likeDislikeDB)
          post.removeLike()
      } else {
          await this.postDatabase.updateLikeDislike(likeDislikeDB)
          post.removeLike()
          post.addDislike()
      }
  } else if (likeDislikeExists === POST_LIKES.DISLIKED) {
      if(like === false){
          await this.postDatabase.removeLikeDislike(likeDislikeDB)
          post.removeDislike()
      } else {
          await this.postDatabase.updateLikeDislike(likeDislikeDB)
          post.removeDislike()
          post.addLike()
      }
  } else {
      await this.postDatabase.insertLikeDislike(likeDislikeDB)
      like ? post.addLike() : post.addDislike()
  }

  const updatedPostDB = post.toDBModel()
  await this.postDatabase.updatePost(updatedPostDB)

  const output: LikeOrDislikePostOutputDTO = undefined
  return output
}

}
