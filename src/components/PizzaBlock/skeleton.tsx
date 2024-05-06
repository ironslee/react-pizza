import React from "react"
import ContentLoader, { IContentLoaderProps } from "react-content-loader"

const Skeleton = (props: IContentLoaderProps) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="137" cy="127" r="127" /> 
    <rect x="0" y="428" rx="0" ry="0" width="90" height="27" /> 
    <rect x="129" y="419" rx="25" ry="25" width="150" height="45" /> 
    <rect x="1" y="268" rx="0" ry="0" width="280" height="27" /> 
    <rect x="94" y="352" rx="0" ry="0" width="0" height="1" /> 
    <rect x="0" y="316" rx="0" ry="0" width="280" height="88" />
  </ContentLoader>
)

export default Skeleton