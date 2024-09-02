export enum ProductCategoryEnum {
  SPORTS = "Sports & Outdoors",
  ELECTRONICS = "Electronics",
  HEALTH = "Health & Personal Care",
  HOME_APPLIANCES = "Home Appliances",
  HOME_AUTOMATION = "Home Automation",
}

export const QueryToEnumMap: { [key: string]: ProductCategoryEnum } = {
  sports: ProductCategoryEnum.SPORTS,
  electronics: ProductCategoryEnum.ELECTRONICS,
  health: ProductCategoryEnum.HEALTH,
  home: ProductCategoryEnum.HOME_APPLIANCES,
  automation: ProductCategoryEnum.HOME_AUTOMATION,
};
