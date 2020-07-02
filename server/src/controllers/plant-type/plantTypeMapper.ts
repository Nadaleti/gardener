import { PlantTypeEnum } from '../../models/enum/plantType.enum';

export interface PlantType {
  name: string;
  iconPath: string;
}

export const PlantTypeMap = new Map<string, PlantType>()
  .set(PlantTypeEnum.ARVORES, {
    name: 'Árvores', iconPath: '/uploads/apple-tree.svg'
  })
  .set(PlantTypeEnum.CACTOS_SUCULENTAS, {
    name: 'Cactos e Suculentas', iconPath: '/uploads/cactus.svg'
  })
  .set(PlantTypeEnum.FLORES, {
    name: 'Flores', iconPath: '/uploads/flower.svg'
  })
  .set(PlantTypeEnum.FRUTAS_LEGUMES, {
    name: 'Frutas e Legumes', iconPath: '/uploads/harvest.svg'
  });
