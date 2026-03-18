import { CategoryService } from '../service/category.service'
import { CharacteristicService } from '../service/characteristic.service'
import { HomeTextService } from '../service/homeText.service'
import { PromotionService } from '../service/promotion.service'
import { DictionaryService } from '../service/dictionary.service'
import { ImageService } from '../service/image.service'

export class Container {
  private static instance: Container
  
  private categoryService: CategoryService
  private characteristicService: CharacteristicService
  private homeTextService: HomeTextService
  private promotionService: PromotionService
  private dictionaryService: DictionaryService
  private imageService: ImageService
  
  private constructor() {
    this.dictionaryService = new DictionaryService()
    this.imageService = new ImageService()
    this.categoryService = new CategoryService(this.dictionaryService, this.imageService)
    this.characteristicService = new CharacteristicService(this.dictionaryService)
    this.homeTextService = new HomeTextService(this.dictionaryService)
    this.promotionService = new PromotionService(this.dictionaryService, this.imageService)
  }
  
  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container()
    }
    return Container.instance
  }
  
  public getCategoryService(): CategoryService {
    return this.categoryService
  }
  
  public getCharacteristicService(): CharacteristicService {
    return this.characteristicService
  }
  
  public getHomeTextService(): HomeTextService {
    return this.homeTextService
  }
  
  public getPromotionService(): PromotionService {
    return this.promotionService
  }
  
  public getDictionaryService(): DictionaryService {
    return this.dictionaryService
  }
  
  public getImageService(): ImageService {
    return this.imageService
  }
}