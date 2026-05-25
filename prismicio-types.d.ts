
import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type PickContentRelationshipFieldData<
  TRelationship extends
    | prismic.CustomTypeModelFetchCustomTypeLevel1
    | prismic.CustomTypeModelFetchCustomTypeLevel2
    | prismic.CustomTypeModelFetchGroupLevel1
    | prismic.CustomTypeModelFetchGroupLevel2,
  TData extends Record<
    string,
    | prismic.AnyRegularField
    | prismic.GroupField
    | prismic.NestedGroupField
    | prismic.SliceZone
  >,
  TLang extends string,
> =

  {
    [TSubRelationship in Extract<
      TRelationship["fields"][number],
      prismic.CustomTypeModelFetchContentRelationshipLevel1
    > as TSubRelationship["id"]]: ContentRelationshipFieldWithData<
      TSubRelationship["customtypes"],
      TLang
    >;
  } &
  {
    [TGroup in Extract<
      TRelationship["fields"][number],
      | prismic.CustomTypeModelFetchGroupLevel1
      | prismic.CustomTypeModelFetchGroupLevel2
    > as TGroup["id"]]: TData[TGroup["id"]] extends prismic.GroupField<
      infer TGroupData
    >
      ? prismic.GroupField<
          PickContentRelationshipFieldData<TGroup, TGroupData, TLang>
        >
      : never;
  } &
  {
    [TFieldKey in Extract<
      TRelationship["fields"][number],
      string
    >]: TFieldKey extends keyof TData ? TData[TFieldKey] : never;
  };

type ContentRelationshipFieldWithData<
  TCustomType extends
    | readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[]
    | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
  TLang extends string = string,
> = {
  [ID in Exclude<
    TCustomType[number],
    string
  >["id"]]: prismic.ContentRelationshipField<
    ID,
    TLang,
    PickContentRelationshipFieldData<
      Extract<TCustomType[number], { id: ID }>,
      Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
      TLang
    >
  >;
}[Exclude<TCustomType[number], string>["id"]];

type HomepageDocumentDataSlicesSlice =
  | PurchaseButtonSlice
  | MarqueeSlice
  | SwitchPlaygroundSlice
  | ColorChangerSlice
  | BentoBoxSlice
  | HeroSlice;

interface HomepageDocumentData {

  slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;
  meta_title: prismic.KeyTextField;

  meta_description: prismic.KeyTextField;

  meta_image: prismic.ImageField<never>;
}

export type HomepageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<HomepageDocumentData>,
    "homepage",
    Lang
  >;

interface ProductDocumentData {

  name: prismic.KeyTextField;

  price: prismic.NumberField;

  image: prismic.ImageField<never>;

  description: prismic.RichTextField;
}

export type ProductDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<ProductDocumentData>,
    "product",
    Lang
  >;

interface SwitchDocumentData {

  name: prismic.KeyTextField;

  hexcolor: prismic.ColorField;
}

export type SwitchDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<SwitchDocumentData>, "switch", Lang>;

export type AllDocumentTypes =
  | HomepageDocument
  | ProductDocument
  | SwitchDocument;

export interface BentoBoxSliceDefaultPrimaryItemsItem {

  size: prismic.SelectField<"Small" | "Medium" | "Large">;

  image: prismic.ImageField<never>;

  text: prismic.RichTextField;
}

export interface BentoBoxSliceDefaultPrimary {

  heading: prismic.RichTextField;

  items: prismic.GroupField<Simplify<BentoBoxSliceDefaultPrimaryItemsItem>>;
}

export type BentoBoxSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<BentoBoxSliceDefaultPrimary>,
  never
>;

type BentoBoxSliceVariation = BentoBoxSliceDefault;

export type BentoBoxSlice = prismic.SharedSlice<
  "bento_box",
  BentoBoxSliceVariation
>;

export interface ColorChangerSliceDefaultPrimary {

  heading: prismic.RichTextField;

  description: prismic.RichTextField;
}

export type ColorChangerSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ColorChangerSliceDefaultPrimary>,
  never
>;

type ColorChangerSliceVariation = ColorChangerSliceDefault;

export type ColorChangerSlice = prismic.SharedSlice<
  "color_changer",
  ColorChangerSliceVariation
>;

export interface HeroSliceDefaultPrimary {

  heading: prismic.RichTextField;

  body: prismic.RichTextField;

  buy_button_text: prismic.KeyTextField;
}

export type HeroSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HeroSliceDefaultPrimary>,
  never
>;

type HeroSliceVariation = HeroSliceDefault;

export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

export interface MarqueeSliceDefaultPrimaryPhrasesItem {

  text: prismic.KeyTextField;
}

export interface MarqueeSliceDefaultPrimary {

  direction: prismic.SelectField<"Left" | "Right">;

  phrases: prismic.GroupField<Simplify<MarqueeSliceDefaultPrimaryPhrasesItem>>;
}

export type MarqueeSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<MarqueeSliceDefaultPrimary>,
  never
>;

type MarqueeSliceVariation = MarqueeSliceDefault;

export type MarqueeSlice = prismic.SharedSlice<
  "marquee",
  MarqueeSliceVariation
>;

export interface PurchaseButtonSliceDefaultPrimary {

  eyebrow: prismic.KeyTextField;

  heading: prismic.RichTextField;

  button_text: prismic.KeyTextField;

  body: prismic.RichTextField;
}

export type PurchaseButtonSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<PurchaseButtonSliceDefaultPrimary>,
  never
>;

type PurchaseButtonSliceVariation = PurchaseButtonSliceDefault;

export type PurchaseButtonSlice = prismic.SharedSlice<
  "purchase_button",
  PurchaseButtonSliceVariation
>;

export interface SwitchPlaygroundSliceDefaultPrimarySwitchesItem {

  switch: ContentRelationshipFieldWithData<
    [{ id: "switch"; fields: ["name", "hexcolor"] }]
  >;
}

export interface SwitchPlaygroundSliceDefaultPrimary {

  heading: prismic.RichTextField;

  description: prismic.RichTextField;

  switches: prismic.GroupField<
    Simplify<SwitchPlaygroundSliceDefaultPrimarySwitchesItem>
  >;
}

export type SwitchPlaygroundSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<SwitchPlaygroundSliceDefaultPrimary>,
  never
>;

type SwitchPlaygroundSliceVariation = SwitchPlaygroundSliceDefault;

export type SwitchPlaygroundSlice = prismic.SharedSlice<
  "switch_playground",
  SwitchPlaygroundSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      HomepageDocument,
      HomepageDocumentData,
      HomepageDocumentDataSlicesSlice,
      ProductDocument,
      ProductDocumentData,
      SwitchDocument,
      SwitchDocumentData,
      AllDocumentTypes,
      BentoBoxSlice,
      BentoBoxSliceDefaultPrimaryItemsItem,
      BentoBoxSliceDefaultPrimary,
      BentoBoxSliceVariation,
      BentoBoxSliceDefault,
      ColorChangerSlice,
      ColorChangerSliceDefaultPrimary,
      ColorChangerSliceVariation,
      ColorChangerSliceDefault,
      HeroSlice,
      HeroSliceDefaultPrimary,
      HeroSliceVariation,
      HeroSliceDefault,
      MarqueeSlice,
      MarqueeSliceDefaultPrimaryPhrasesItem,
      MarqueeSliceDefaultPrimary,
      MarqueeSliceVariation,
      MarqueeSliceDefault,
      PurchaseButtonSlice,
      PurchaseButtonSliceDefaultPrimary,
      PurchaseButtonSliceVariation,
      PurchaseButtonSliceDefault,
      SwitchPlaygroundSlice,
      SwitchPlaygroundSliceDefaultPrimarySwitchesItem,
      SwitchPlaygroundSliceDefaultPrimary,
      SwitchPlaygroundSliceVariation,
      SwitchPlaygroundSliceDefault,
    };
  }
}
