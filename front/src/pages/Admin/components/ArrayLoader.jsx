import React from "react"
import ContentLoader from "react-content-loader"

const ArrayLoader = (props) => (
    <ContentLoader 
        speed={2}
        width={1200}
        height={1000}
        viewBox="0 0 1200 1000"
        backgroundColor="#ededed"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="11" y="73" rx="0" ry="0" width="100%" height="41" /> 
        <rect x="10" y="127" rx="0" ry="0" width="100%" height="41" /> 
        <rect x="11" y="181" rx="0" ry="0" width="100%" height="41" /> 
        <rect x="10" y="234" rx="0" ry="0" width="100%" height="41" /> 
        <rect x="10" y="288" rx="0" ry="0" width="100%" height="41" /> 
        <rect x="10" y="340" rx="0" ry="0" width="100%" height="41" /> 
        <rect x="12" y="13" rx="0" ry="0" width="115" height="37" /> 
        <rect x="161" y="13" rx="0" ry="0" width="115" height="37" /> 
        <rect x="316" y="12" rx="0" ry="0" width="115" height="37" /> 
        <rect x="467" y="13" rx="0" ry="0" width="115" height="37" />
    </ContentLoader>
)

export default ArrayLoader