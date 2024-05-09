import React from 'react'
import { GeneratedUIProps, Message, UIComponent } from '@/lib/types'
import { SpotifyTrack } from './tools/Spotify';
import { WeatherData } from './tools/Weather';
import { ClockComponent } from './tools/Clock';
import { config } from '@/app/config';

const GeneratedUI = ({ message, currentUIComponent, useSpotify, useRabbitMode }: GeneratedUIProps) => {
    return (
        <>
            {/* {useSpotify && ( */}
                <div className={`absolute left-0 bottom-0 flex items-center justify-end transform`}>
                    <SpotifyTrack trackId={"3eh51r6rFWAlGQRlHx9QnQ"} width={300} height={80} />
                </div>
            {/* )} */}
            {currentUIComponent && currentUIComponent.component === 'weather' && (
                <div className={`weather-data absolute ${useRabbitMode ? '-top-[68px] right-[79px] scale-[0.92]' : 'top-0 left-0 right-0 justify-end'} flex items-center`}>
                    <WeatherData data={currentUIComponent.data} />
                </div>
            )}
            {currentUIComponent && currentUIComponent.component === 'time' && (
                <div className={`z-10 absolute ${useRabbitMode ? 'left-[55px] top-[92px]' : 'right-[125px] top-[30px]'} flex items-center justify-end`}>
                    <ClockComponent />
                </div>
            )}
            {message && message.message && (
                <div className={`absolute ${useRabbitMode ? 'top-[calc(100%+20px)]' : 'top-[450px] right-[50px]'} flex items-center justify-end`}>
                    {config.enableResponseTimes && (
                        <p className="text-xs text-gray-500">Message response time: +{message.responseTime.toFixed(2)} seconds</p>
                    )}
                </div>
            )}
        </>
    )
}

export default GeneratedUI
