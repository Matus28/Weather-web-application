import mongoose, { Model } from 'mongoose'

const Schema = mongoose.Schema

export interface City {
  cityName: string
  userId: string
  isDefault: boolean
}

interface CityModel extends Model<City> {
  setDefaultCity(cityName: string, userId: string, isDefault: boolean): void | City
}

export const citySchema = new Schema<City, CityModel>({
  cityName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    required: true,
    default: false,
  },
})

// Set Default city static method
citySchema.static(
  'setDefaultCity',
  async function (cityName: string, userId: string, isDefault: boolean) {
    if (!cityName) {
      throw Error('No city selected.')
    }

    const exists = await this.findOne({
      cityName: {
        $regex: `^${cityName}`,
        $options: 'i',
      },
      userId,
    })

    if (!exists) {
      await this.create({ cityName, userId })
    }

    await this.updateMany({ userId }, { $set: { isDefault: false } })
    console.log(`is default: ${isDefault}`)
    if (isDefault) {
      await this.updateOne(
        {
          cityName: {
            $regex: `^${cityName}`,
            $options: 'i',
          },
          userId,
        },
        { $set: { isDefault: true } },
      )
    }

    const result = await this.findOne({ userId })

    return result
  },
)

export const City = mongoose.model<City, CityModel>('City', citySchema)
