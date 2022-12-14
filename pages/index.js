import React, { useState } from "react";
import axios from 'axios';
import SocialCard from "../components/Card";
import styles from '../styles/Home.module.css'

const Home = ({ videos, error }) => {
  const [list, setList] = useState([]);

  async function handleClick () {
    try {
      const res = await axios.get('http://localhost:1337/api/ftp-scan');
      const videos = res.data;
      console.log(videos);
      setList(videos);
      console.log('list',list);
    } catch (error) {
      console.log('error');
      return { error };
    }
  }

  async function handleUpload (e) {
    console.log('Upload', e);

  }

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.grid1}>
          {videos.data.map(video => (
            <SocialCard 
              key={video.id}
              video={video.attributes}
              content='This is a media.'
              likes='3'
              // likeIsClicked={video.likeIsClicked}
            />
          ))}
        </div>
        <div className={styles.grid1}>
          <button className={styles.success} onClick={handleClick}>FTP Directory List</button>
        </div>
        <table className={styles.table}>
          <thead><tr><th>Title</th><th>Provider</th></tr></thead>
          <tbody>
            {list && list.map(item => (
              <tr key={item.id} data-item={item} className={styles.tr}>
                <td className={styles.td}>{item.title}</td>
                <td className={styles.td}>{item.provider}</td>
                <td><button onClick={handleUpload}>Upload</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Home.getInitialProps = async ctx => {
  try {
    const res = await axios.get('http://localhost:1337/api/videos');
    const videos = res.data;
    return { videos };
  } catch (error) {
    console.log('error');
    return { error };
  }
};

export default Home;