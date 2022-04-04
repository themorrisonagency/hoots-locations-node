import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm"
import { ObjectType, Field, Int } from "type-graphql"

@ObjectType()
@Entity()
export class Location extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  @Column({ nullable: true })
  address: string

  @Field()
  @Column({ nullable: true })
  description: string
  
  @Field()
  @Column({ nullable: true })
  hours!: string
  
  @Field()
  @Column({ nullable: true })
  name: string
  
  @Field()
  @Column({ nullable: true })
  cityCoordinate: string
  
  @Field()
  @Column({ nullable: true })
  c_cateringURL: string
  
  @Field()
  @Column({ nullable: true })
  c_infoBanner: string
  
  @Field()
  @Column({ nullable: true })
  c_locationHighlights: string
  
  @Field()
  @Column({ nullable: true })
  c_locationName: string
  
  @Field()
  @Column({ nullable: true })
  c_locationShortName: string
  
  @Field()
  @Column({ nullable: true })
  c_locationSlug: string
  
  @Field()
  @Column({ nullable: true })
  c_mapTile: string
  
  @Field()
  @Column({ nullable: true })
  c_mapUrl: string
  
  @Field()
  @Column({ nullable: true })
  c_oloID: string
  
  @Field()
  @Column({ nullable: true })
  c_promoUrl: string

  @Field()
  @Column({ nullable: true })
  c_promoGraphic: string
  
  @Field()
  @Column({ nullable: true })
  c_shortDescription: string
  
  @Field()
  @Column({ nullable: true })
  displayCoordinate: string
  
  @Field()
  @Column({ nullable: true })
  geocodedCoordinate: string
  
  @Field()
  @Column({ nullable: true })
  isoRegionCode: string
  
  @Field()
  @Column({ nullable: true })
  mainPhone: string
  
  @Field()
  @Column({ nullable: true })
  orderUrl: string

  @Field()
  @Column({ nullable: true })
  c_masthead: string
  
  @Field()
  @Column({ default: false })
  visible: boolean

  @Field()
  @Column({ default: false })
  comingSoon: boolean
  
  @Field()
  @Column({ nullable: true })
  routableCoordinate: string
  
  @Field()
  @Column({ nullable: true })
  timezone: string
  
  @Field()
  @Column({ nullable: true })
  yextDisplayCoordinate: string
  
  @Field()
  @Column({ nullable: true })
  yextRoutableCoordinate: string
  
  @Field()
  @Column({ nullable: true })
  meta: string
  
  @Field()
  @Column({ nullable: true })
  categoryIds: string
  
  @Field()
  @Column({ nullable: true })
  timeZoneUtcOffset: string

  @Field()
  @Column({ nullable: true})
  addressHidden: boolean

  @Field()
  @Column({ nullable: true})
  localPhone: string

  @Field()
  @Column({nullable: true})
  c_comingSoonText: string

  @Field()
  @Column({ unique: true })
  yextId: string

  @Field()
  @Column({nullable: true})

  @Field()
  @Column({nullable: true})
  c_displayOrder: string


  @Field()
  @CreateDateColumn()
  createdAd: Date;

}
