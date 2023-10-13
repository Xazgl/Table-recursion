
import "server-only"
import styles from "./bar.module.css";
import ReplyIcon from '@mui/icons-material/Reply';
import MenuIcon from '@mui/icons-material/Menu';

export function Bar({ }) {

  return <header className={styles.bar}>
    <div className="flex items-center gap-3">

      <div className="w-9 h-9 relativ  cursor-pointer">
        <div className="flex items-center justify-center h-full">
          <MenuIcon sx={{ color: 'white' }} />
        </div>
      </div>

      <div className="w-9 h-9 relativ  cursor-pointer">
        <div className="flex items-center justify-center h-full">
          <ReplyIcon sx={{ color: 'white' }} />
        </div>
      </div>

    </div>
  </header >
}