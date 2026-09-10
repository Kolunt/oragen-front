import React, { FC, useEffect, useMemo, useState } from 'react';
import { List } from 'antd';
import { Button, CheckboxCustom } from 'ui-kit';
import { useAgreementStore } from 'pages/AgreementPage/useAgreementStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import { IUserAgreementPayload } from 'api/applicationsApi';
import './AgreementPage.scss';

interface IAgreementPageProps {
  id: string;
}

export const AgreementPage: FC<IAgreementPageProps> = ({ id }) => {
  const [agreementMail, setAgreementMail] = useState<boolean>(false);
  const [agreementData, setAgreementData] = useState<boolean>(false);
  const data = useAgreementStore((state) => state.data);
  const getAgreementData = useAgreementStore((state) => state.getAgreementData);
  const sendAgreement = useAgreementStore((state) => state.sendAgreement);
  const navigate = useNavigate();

  useEffect(() => {
    if (id.length) {
      getAgreementData(+id);
    }
  }, []);

  const onCancel = () => {
    navigate(ROUTES.MAIN);
    navigate(0);
  };

  const onSendAgreement = async () => {
    if (data) {
      const payload: IUserAgreementPayload = {
        proposal_id: +data.id,
        user_agreement_contact: 1,
        user_agreement_mail: agreementMail ? 1 : 0,
        user_agreement_sms: agreementMail ? 1 : 0,
      };
      await sendAgreement(payload, () => navigate(ROUTES.MAIN));
      navigate(0);
    }
  };

  const editedData = useMemo(() => {
    return data
      ? [
          ['ФИО', data.full_name],
          ['Место работы', data.company],
          // ['Тип', data.organization_type === 'mpi' ? 'ЛПУ' : 'Аптека'],
          ['Специальность', data.position],
          ['Номер телефона', data.phone],
          ['Email', data.email],
          ['Адрес', data.address],
        ]
      : [['Данные', 'не подгрузились']];
  }, [data]);

  return (
    <div className='AgreementPage'>
      <List
        className={'ListStyle'}
        header={
          <div className={'fw-600'}>
            Согласие на обработку персональных данных
          </div>
        }
        footer={
          <div>
            <div className='mb-10 flex gap-x-10'>
              <CheckboxCustom
                className={'CustomCheckBox'}
                isChecked={agreementMail}
                onChange={() => setAgreementMail(!agreementMail)}
              />
              <p>Я согласен получать уведомления и рассылки</p>
            </div>
            <div className='mb-20 flex gap-x-10'>
              <CheckboxCustom
                className={'CustomCheckBox'}
                isChecked={agreementData}
                onChange={() => setAgreementData(!agreementData)}
              />
              <p>
                Нажимая данную галочку, вы подтверждаете, что ознакомлены с
                политикой конфиденциальности и согласием
              </p>
            </div>
            <div className='flex justify-center gap-x-20'>
              {!!id.length && (
                <Button
                  className='AcceptButton'
                  onClick={onSendAgreement}
                  disabled={!agreementData}
                >
                  Принять
                </Button>
              )}
              <Button className='CancelButton' onClick={onCancel}>
                Отклонить
              </Button>
            </div>
          </div>
        }
        bordered
        dataSource={editedData}
        renderItem={(item) => (
          <List.Item className={'ListItemStyle'}>
            <span className={'fw-600'}>{item[0]}</span>
            <span className={'word-break'}>{item[1]}</span>
          </List.Item>
        )}
      />
    </div>
  );
};
