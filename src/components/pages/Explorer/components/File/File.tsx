import './File.css';

type File = {
  name: string,
  owner: string,
  lastChange: string,
  size: string,
}

export default function File({name, owner, lastChange, size}: File) {
  return (
    <div className="file-item">
      <div className="file-item-img">
        <img src="https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document" alt="docs"></img>
        <span>{name}</span>
      </div>

      <div className="file-item-info file-item-owner">
        <span>{owner}</span>
      </div>

      <div className="file-item-info file-item-time">
        <span>{lastChange}</span>
      </div>

      <div className="file-item-size file-item-size">
        <span>{size}</span>
      </div>
    </div>
  )
}
