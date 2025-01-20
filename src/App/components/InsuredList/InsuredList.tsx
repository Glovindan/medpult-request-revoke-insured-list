import React, { useEffect, useState } from 'react';
import CustomList from '../../../UIKit/CustomList/CustomList';
import { ItemData, ListColumnData } from '../../../UIKit/CustomList/CustomListTypes';
import { InsuredListData } from '../../shared/types';
import Scripts from '../../shared/utils/clientScripts';
import { redirectSPA } from '../../shared/utils/utils';

/** Список застрахованных */
export default function InsuredList() {
	// const { data, setValue } = insuredListContext.useContext();

	/** Колонки списка */
	const columns = [
		new ListColumnData({ name: "ФИО застрахованного", code: "fullname", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Дата рождения", code: "birthdate", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Телефон", code: "phone", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Email", code: "email", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Полис", code: "policy", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Дата начала действия полиса", code: "policyStartDate", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Дата окончания действия полиса", code: "policyEndDate", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Срок действия полиса", code: "policyTerm", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Регион действия полиса", code: "policyRegion", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Продукт", code: "policyProduct", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "План страхования", code: "plan", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "", code: "moreButton", fr: 1, isSortable: false, isLink: true, onClick: (props) => { Scripts.openContractorById(props.info) } }),
	]

	/** Идентификаторы выбранных контрагентов */
	const [selectedContractorsIds, setSelectedContractorsIds] = useState<string[]>([]);

	/** Идентификатор задачи */
	const [taskId, setTaskId] = useState<string | undefined>();

	/** Идентификатор согласования */
	const [approvalId, setApprovalId] = useState<string | undefined>();

	useEffect(() => console.log(selectedContractorsIds), [selectedContractorsIds])

	/** Присвоить callback для получения выбранных контрагентов */
	function setGetContractorsCallback() {
		const callback = (): string[] => selectedContractorsIds;
		Scripts.setGetContractorsCallback(callback)
	}

	/** Присвоить callback для изменения текщей задачи */
	function setUpdateTaskIdCallback() {
		const callback = (taskid: string): void => setTaskId(taskId);
		Scripts.setUpdateTaskIdCallback(callback)
	}

	/** Присвоить callback для изменения согласования */
	function setUpdateApprovalIdCallback() {
		const callback = (approvalId: string): void => setApprovalId(taskId);
		Scripts.setUpdateApprovalIdCallback(callback)
	}

	React.useLayoutEffect(() => {
		setGetContractorsCallback()
		setUpdateTaskIdCallback()
		setUpdateApprovalIdCallback()
	}, []);

	// Перезагрузка списка при изменении ID согласования
	useEffect(() => {
		// TODO:
	}, [approvalId])	

	// Изменение выбранных контрагентов при изменении задачи
	useEffect(() => {
		if(!taskId) return;
		// TODO: Запустить загрузку
		Scripts.getSelectedContractors(taskId).then(contractorsIds => {
			setSelectedContractorsIds(contractorsIds)
			// TODO: Завершить загрузку
		})
	}, [taskId])
	
	const [reloadHandler, setReloadHandler] = useState<() => void>(() => { });

	/** Установка обработчика нажатия на поиск */
	const setSearchHandler = (callback: () => void) => {
		setReloadHandler(() => callback);
	};


	return (
		<div className="insured-list">
			<div className='insured-list__list'>
				<CustomList<undefined, InsuredListData>
					columnsSettings={columns}
					getDataHandler={Scripts.getInsuredListFactory(approvalId)}
					isSelectable={true}
					isMultipleSelect={true}
					height='500px'
					listWidth={2000}
					setSelectedItems={(ids: string[]) => setSelectedContractorsIds(ids)}
					selectedItems={selectedContractorsIds}
					setSearchHandler={setSearchHandler}
				/>
			</div>
		</div>
	)
}