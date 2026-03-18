import { CategoryBody } from '$/types'
import { Request, Response } from 'express'
import { CategoryService } from '../service/category.service'
import { Container } from '../utils/container'

export default class CategoryController {
  private categoryService: CategoryService

  constructor() {
    this.categoryService = Container.getInstance().getCategoryService()
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryService.findAll()

      return res.status(200).json(categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)

      const category = await this.categoryService.findById(id)

      if (!category) {
        return res.status(404).json({ message: 'Category not found' })
      }

      return res.status(200).json(category)
    } catch (error) {
      console.error('Error fetching category:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const body = req.body as CategoryBody
      const images = req.files as Express.Multer.File[]

      body.image = [images[0].path]

      await this.categoryService.create(body)

      return res.sendStatus(201)
    } catch (error) {
      console.error('Error creating category:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)
      const body = req.body as CategoryBody
      const images = req.files as Express.Multer.File[]

      if (images && images.length > 0) {
        body.image = [images[0].path]
        await this.categoryService.update(id, body, true)
      } else {
        await this.categoryService.update(id, body, false)
      }

      return res.sendStatus(204)
    } catch (error) {
      console.error('Error updating category:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)

      await this.categoryService.delete(id)

      return res.sendStatus(204)
    } catch (error) {
      console.error('Error deleting category:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  reorder = async (req: Request, res: Response) => {
    try {
      const ids = req.body as number[]

      await this.categoryService.reorder(ids)

      return res.sendStatus(204)
    } catch (error) {
      console.error('Error reordering categories:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
