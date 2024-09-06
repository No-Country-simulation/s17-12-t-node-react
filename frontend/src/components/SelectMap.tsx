'use client'
import { useState, useRef, useEffect } from 'react'
import { Map, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Country, Feature } from '@/interfaces/album'
import countryList from '@/utils/countryList'

type Props = {
  markerCoordinates: Country | null
  setMarkerCoordinates: (country: Country | null) => void
  tags: string[]
  setTags: (tag: string[]) => void
}

const SelectMap: React.FC<Props> = ({ markerCoordinates, setMarkerCoordinates, tags, setTags }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [isPlaceConfirmed, setIsPlaceConfirmed] = useState(false)
  const [placeName, setIsPlaceName] = useState<string>('')
  const [placeCoordinates, setPlaceCoordinates] = useState<[number, number]>([0, 0])
  const mapRef = useRef<any>(null)

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countryList.find(c => c.description === e.target.value)
    if (country) {
      setSelectedCountry(country)
      setMarkerCoordinates(null)
      setIsPlaceConfirmed(false)

      if (mapRef.current) {
        console.log(mapRef.current)
        mapRef.current.flyTo({
          center: [country.longitude, country.latitude],
          zoom: 4,
          essential: true,
        })
      }
    }
  }

  const getPlaceName = (features: Feature[]) => {
    const placeFeature = features?.find((feature) => feature.id.includes('place'));

    return placeFeature ? placeFeature.place_name : 'Lugar no identificado';
  };

  const searchPlace = async (longitude: number, latitude: number) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    )
    const data = await response.json()

    if (data?.features?.length > 0) {
      const placeName = getPlaceName(data.features)
      return placeName
    }

    return 'Lugar no identificado'
  }

  const handleMapClick = (event: any) => {
    setPlaceCoordinates([event.lngLat.lng, event.lngLat.lat])

    setMarkerCoordinates({
      description: placeName,
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng
    })
    setIsPlaceConfirmed(false)
  }

  const handleConfirmPlace = async () => {
    const placeName = await searchPlace(placeCoordinates[0], placeCoordinates[1]);
    console.log('Nombre del lugar:', placeName);
    setIsPlaceName(() => placeName)
    if (placeName) {
      setIsPlaceConfirmed(true)
    }
  }

  useEffect(() => {
    if (isPlaceConfirmed) {
      const isPlaceNameInTags = tags.includes(placeName)
      console.log(isPlaceNameInTags)
      if (!isPlaceNameInTags) {
        setTags([...tags, placeName])
      }
      const newMarker = {
        description: placeName,
        latitude: markerCoordinates?.latitude as number,
        longitude: markerCoordinates?.longitude as number
      }
      setMarkerCoordinates(newMarker)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaceConfirmed]);

  return (
    <>
      <div className="flex items-end justify-between">
        {/* tengo que agregarle el icono de ubicacion */}
        <label htmlFor="country">País</label>
        <select className='rounded-lg border min-w-56 border-gray-300 text-gray-700 sm:text-sm' id="country" onChange={handleCountryChange}>
          <option className='text-black' defaultValue={''} value=''>Selecciona un país</option>
          {countryList.map((country) => (
            <option className='text-black' key={country.description} value={country.description}>
              {country.description}
            </option>
          ))}
        </select>
      </div>

      <div className='relative w-full'>
        {selectedCountry && !isPlaceConfirmed && (
          <Map
            initialViewState={{
              longitude: selectedCountry.longitude,
              latitude: selectedCountry.latitude,
              zoom: 4,
            }}
            style={{ width: '100%', height: '437px', borderRadius: '32px' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onClick={handleMapClick}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            ref={mapRef}
          >
            {markerCoordinates && (
              <Marker longitude={markerCoordinates.longitude} latitude={markerCoordinates.latitude} />
            )}
          </Map>
        )}

        {isPlaceConfirmed && selectedCountry && (
          <div className="flex flex-col gap-2 justify-center">
            <span>Lugar: {markerCoordinates?.description}</span>
            <button
              onClick={() => setIsPlaceConfirmed(false)}
              className="w-full rounded-2xl px-4 py-2 bg-[#868F7A] text-white"
              type='button'
            >
              Editar lugar
            </button>
          </div>
        )}
        {!isPlaceConfirmed && selectedCountry && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleConfirmPlace}
              className="w-full absolute bottom-4 z-50 rounded-b-2xl px-4 py-2 bg-[#868F7A] text-white"
              type='button'
            >
              Confirmar lugar
            </button>
          </div>
        )}
      </div>

    </>
  )
}

export default SelectMap
