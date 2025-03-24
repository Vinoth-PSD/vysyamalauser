
import { useState, useEffect } from 'react';
import { NotifyError, NotifySuccess, ToastNotification } from '../../Toast/ToastNotification';
import apiClient from '../../../API';

type Alert = {
    id: number;
    alert_name: string;
};

type AlertSettingsResponse = {
    status: string;
    message: string;
    data: {
        "Email Alerts": Alert[];
        "SMS Alerts": Alert[];
    };
};

type EnabledNotificationsResponse = {
    status: string;
    message: string;
    data: Alert[];
};

export const AlertSettings = () => {
    const [emailAlerts, setEmailAlerts] = useState<Alert[]>([]);
    const [smsAlerts, setSmsAlerts] = useState<Alert[]>([]);
    const [selectedAlerts, setSelectedAlerts] = useState<{ [key: string]: boolean }>({});
    const profileId = sessionStorage.getItem('loginuser_profile_id');
    useEffect(() => {
        // Fetch all available alerts
        apiClient
            .post<AlertSettingsResponse>('/auth/Get_alert_settings/')
            .then((response) => {
                const { data } = response.data;
                setEmailAlerts(data['Email Alerts']);
                setSmsAlerts(data['SMS Alerts']);

                // Initialize selectedAlerts state
                const initialAlerts: { [key: string]: boolean } = {};
                data['Email Alerts'].forEach((alert) => {
                    initialAlerts[alert.alert_name] = false;
                });
                data['SMS Alerts'].forEach((alert) => {
                    initialAlerts[alert.alert_name] = false;
                });
                setSelectedAlerts(initialAlerts);
            })
            .catch((error) => {
                console.error('Error fetching alert settings:', error);
            });

        // Fetch enabled notifications for the profile
        apiClient
            .post<EnabledNotificationsResponse>('/auth/Get_enabled_notifications/', { profile_id: profileId })
            .then((response) => {
                const enabledAlerts = response.data.data;
                const updatedSelectedAlerts = { ...selectedAlerts };

                enabledAlerts.forEach((alert) => {
                    updatedSelectedAlerts[alert.alert_name] = true;
                });

                setSelectedAlerts(updatedSelectedAlerts);
            })
            .catch((error) => {
                console.error('Error fetching enabled notifications:', error);
            });
    }, [profileId]);

    const handleCheckboxChange = (alertName: string) => {
        setSelectedAlerts((prev) => ({
            ...prev,
            [alertName]: !prev[alertName],
        }));
    };

    const updateNotificationSettings = () => {
        // Collect the IDs of all selected alerts
        const enabledAlertIds = [
            ...emailAlerts.filter(alert => selectedAlerts[alert.alert_name]).map(alert => alert.id),
            ...smsAlerts.filter(alert => selectedAlerts[alert.alert_name]).map(alert => alert.id)
        ].join(',');

        const payload = {
            profile_id: profileId,
            Notifcation_enabled: enabledAlertIds,
        };

        apiClient
            .post('/auth/Update_notification_settings/', payload)
            .then((response) => {
                if (response.data.status === "1") {
                    NotifySuccess('Notification settings updated successfully');
                } else {
                    NotifyError('Failed to update notification settings');
                }
            })
            .catch((error) => {
                console.error('Error updating notification settings:', error);
            });
    };

    return (
        <div>
            <ToastNotification/>
            <div>
                <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">Alert Settings</h2>

                <div>
                    <div className="">
                        <div>
                            <div className="mb-5">
                                <h4 className="text-[20px] text-primary font-semibold mb-3 max-sm:text-[16px] max-md:mb-1">Email Alert</h4>

                                <div className="w-[70%] grid grid-cols-2 justify-between items-start max-lg:w-full max-2xl:w-[70%] max-xl:w-full max-sm:grid-cols-1">
                                    <div>
                                        {emailAlerts.slice(0, 3).map((alert) => (
                                            <div className="mb-2" key={alert.id}>
                                                <input
                                                    type="checkbox"
                                                    name={alert.alert_name}
                                                    id={alert.alert_name}
                                                    className="mr-2"
                                                    checked={selectedAlerts[alert.alert_name] || false}
                                                    onChange={() => handleCheckboxChange(alert.alert_name)}
                                                />
                                                <label htmlFor={alert.alert_name} className="text-[20px] font-normal  text-ash max-md:text-[16px]">
                                                    {alert.alert_name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        {emailAlerts.slice(3).map((alert) => (
                                            <div className="mb-2" key={alert.id}>
                                                <input
                                                    type="checkbox"
                                                    name={alert.alert_name}
                                                    id={alert.alert_name}
                                                    className="mr-2"
                                                    checked={selectedAlerts[alert.alert_name] || false}
                                                    onChange={() => handleCheckboxChange(alert.alert_name)}
                                                />
                                                <label htmlFor={alert.alert_name} className="text-[20px] font-normal  text-ash max-md:text-[16px]">
                                                    {alert.alert_name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* SMS Alert */}
                            <div className='mb-5'>
                                <h4 className="text-[20px] text-primary font-semibold mb-3 max-sm:text-[16px] max-md:mb-1">SMS Alert</h4>

                                <div className="w-[70%] grid grid-cols-2 justify-between items-start max-lg:w-full max-2xl:w-[70%] max-xl:w-full max-sm:grid-cols-1">
                                    {smsAlerts.map((alert) => (
                                        <div key={alert.id}>
                                            <input
                                                type="checkbox"
                                                name={alert.alert_name}
                                                id={alert.alert_name}
                                                className="mr-2"
                                                checked={selectedAlerts[alert.alert_name] || false}
                                                onChange={() => handleCheckboxChange(alert.alert_name)}
                                            />
                                            <label htmlFor={alert.alert_name} className="text-[20px] font-normal  text-ash max-md:text-[16px]">
                                                {alert.alert_name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end items-center space-x-5">
                           
                            <button
                                onClick={updateNotificationSettings}
                                className="bg-white text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer"
                            >
                                Update Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
