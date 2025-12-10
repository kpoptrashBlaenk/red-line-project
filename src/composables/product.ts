import { Product } from '$/types'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { ProductSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

export function useProduct(){
    function createFields(){
        return [
            // image
            {
                element: 'divider',
                label: translation('image'),
            },
            {
                element: 'image',
                name: 'image',
                label: translation('upload'),
            },
            
            //en
            {
                element: 'divider',
                label: translation('english'),
            },
            {
                element: 'input',
                name: 'name_en',
                label: translation('name'),
            },
            //fr
            {
                element: 'divider',
                label: translation('french'),
            },
            {
                element: 'input',
                name: 'name_fr',
                label: translation('name'),
            }
        ] as FormField[]
    }

    function flatten(product: Product) {
        return {
            image: product.image,
            name_en: product.name.en,
            name_fr: product.name.fr,
        }
    }

    function get(){
        const promotions: Product[] = []
        return promotions ?? []
    }

    async function reorder(items: Product[]) {
        items

        await presentToast(translation('toast_reordered'), 'success', checkmarkCircleOutline)
    }

    async function create(state: ProductSchema) {
        state

        await presentToast(translation('toast_added'), 'success', checkmarkCircleOutline)
    }

    async function modify(id: number, state: ProductSchema) {
        id
        state

        await presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
    }

    function remove(id: number) {}

    // return all functions
    return {
        createFields,
        flatten,
        get,
        reorder,
        create,
        modify,
        remove,
    }
}