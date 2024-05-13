import { Form, FormListFieldData, InputNumber, Space } from 'antd';
import style from '../MonthsFormList.module.scss'

interface FormListItemProps {
  field: FormListFieldData;
  fieldName: string;
  label: string;
  initialValue: Array<number | null | ''>[];
  tech: string[];
}

/** Компонент элементов (списков) параметров внутри каждого месяца.
 * Для параметра список содержит 2-4 поля ввода (элементов списков)
 * @description Form.Item > Form.List > Form.Item
 */
const MonthDataItemList = ({ field, fieldName, label, initialValue, tech }: FormListItemProps) => {
  return (
    <Form.Item label={label} style={{ marginBottom: 0 }}>
      <Form.List name={[field.name, fieldName]} initialValue={initialValue}>
        {(subfields) => (
          <Space.Compact block>
            {subfields.map((subfield) => (
              <Form.Item
                style={{
                  marginBottom: 0,
                }}
                className={style.formItem}
                preserve={false}
                key={subfield.key}
                name={subfield.name}
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}>
                <InputNumber style={{ width: '100%' }} placeholder={`${tech[subfield.key]}`} min={0} />
              </Form.Item>
            ))}
          </Space.Compact>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default MonthDataItemList;
