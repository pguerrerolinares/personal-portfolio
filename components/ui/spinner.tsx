import styles from './spinner.module.scss';

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <div
      className={`${styles.spinner} ${styles[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}
