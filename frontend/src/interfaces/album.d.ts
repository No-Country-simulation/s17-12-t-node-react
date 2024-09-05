export interface Album {
  title: string
  description: string
  location: Country
  photos: PhotoFromAlbum[]
  tags: string[]
}

export interface Country {
  description: string
  latitude: number
  longitude: number
}

export interface PhotoFromAlbum {
  url: string
  description: string
}

export interface Feature {
  id: string
  place_name: string
  place_type: string[]
}
