import express from 'express'
import { CommentsBusiness } from '../business/CommentsBusiness'
import { PostBusiness } from '../business/PostBusiness'
import { CommentsController } from '../controller/CommentsController'
import { PostController } from '../controller/PostController'
import { CommentsDatabase } from '../database/CommentsDatabase'
import { PostsDatabase } from '../database/PostDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const postRouter = express.Router()

const postController = new PostController(
  new PostBusiness(
    new PostsDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
)

const commentsController = new CommentsController(
  new CommentsBusiness(
      new CommentsDatabase(),
      new IdGenerator(),
      new TokenManager(),
      new PostsDatabase()
  )
)


postRouter.post("/", postController.createPost)

postRouter.get("/", postController.getPosts)

postRouter.post("/:post_id/comments", commentsController.createComment)

postRouter.get("/:post_id/comments", commentsController.getComments);

postRouter.put("/:post_id/like", postController.likeOrDislikePost)

postRouter.put("/:post_id/comments/:comment_id/like", commentsController.likeOrDislikeComment)

export default postRouter