import { ProductService } from '#/service/product.service'
import { ProductBody } from '$/types'
import { Request, Response } from 'express'

export default class ProductController {
  private productService: ProductService

  constructor() {
    this.productService = new ProductService()
  }

  getAll = async (_req: Request, res: Response) => {
    try {
      const data = await this.productService.findAll()
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching products:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)

      const product = await this.productService.findById(id)

      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }

      return res.status(200).json(product)
    } catch (error) {
      console.error('Error fetching product:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  getByCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.id)

      const data = await this.productService.findByCategory(categoryId)

      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching products by category:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  getTop = async (_req: Request, res: Response) => {
    try {
      const data = await this.productService.findTop()
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching top products:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const body = req.body as ProductBody
      const images = req.files as Express.Multer.File[]

      body.image = images.map((image) => image.path)

      const created = await this.productService.create(body)

      return res.status(201).json(created)
    } catch (error) {
      console.error('Error creating product:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)
      const body = req.body as ProductBody
      const images = req.files as Express.Multer.File[]

      await this.productService.update(
        id,
        body,
        images.map((image) => image.path),
      )

      return res.sendStatus(204)
    } catch (error) {
      console.error('Error updating product:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)

      await this.productService.delete(id)

      return res.sendStatus(204)
    } catch (error) {
      console.error('Error deleting product:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  reorder = async (req: Request, res: Response) => {
    try {
      const ids = req.body as number[]

      await this.productService.reorder(ids)

      return res.sendStatus(204)
    } catch (error) {
      console.error('Error reordering products:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
