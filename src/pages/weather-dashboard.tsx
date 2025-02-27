import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, AlertTriangle,RefreshCw } from 'lucide-react';

import { useGeolocation } from '@/hooks/use-geolocation';
import WeatherSkeleton from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';

const WeatherDashboard: React.FC = () => {
  const { 
    coordinates, 
    error: locationError, 
    getLocation, 
    isLoading: isLocationLoading 
  } = useGeolocation();

  console.log(coordinates);

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  console.log('weatherQuery: ',weatherQuery.data);
  console.log('forecastQuery: ',forecastQuery.data);
  console.log('locationQuery: ',locationQuery.data);

  const handleRefresh = () => {
    console.log('refresh');
    getLocation();

    if (coordinates) {
      console.log(coordinates);
      // reload weather data
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (isLocationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];
  console.log('locationName: ', locationName);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h2 className="text-md tracking-tight">
          {locationName?.name ?? 'Unknown'}
          {locationName?.state && (
            <span className="text-muted-foreground text-sm">
              {`, ${locationName.state}`}
            </span>
          )}
          {locationName?.country && (
            <span className="text-muted-foreground text-sm">
              {`, ${locationName.country}`}
            </span>
          )}
        </h2>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      {/* Favorite Cities */}
      </div>
  );
};

export default WeatherDashboard;
