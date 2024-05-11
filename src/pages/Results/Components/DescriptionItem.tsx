import style from './DescriptionItem.module.scss'

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
  unit?: string;
}

const DescriptionItem = ({ title, content, unit }: DescriptionItemProps) => (
  <div className={style.descriptionItemWrapper}>
    <p className={style.descriptionItemP}>{title}:</p>
    {content}
    <span className={style.descriptionItemP}>{unit}</span>
  </div>
);

export default DescriptionItem;