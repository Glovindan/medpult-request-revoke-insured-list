import { FetchData, ItemData, SortData } from '../../../UIKit/CustomList/CustomListTypes'
import { InsuredListData } from '../types'
/** Заглушка ожидания ответа сервера */
function randomDelay() {
	const delay = Math.random() * 1000
	return new Promise((resolve) => {
		setTimeout(resolve, delay)
	})
}

/** Factory получения списка застрахованных */
function getInsuredListFactory(approvalId?: string) {
	return async (
		page: number,
		sortData?: SortData
	): Promise<FetchData<InsuredListData>> => {
		// TODO: Поиск по approvalId
		await randomDelay()
	
		console.log({
			page,
			sortData,
		})
	
		const mockData: InsuredListData = {
			fullname: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			birthdate: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			phone: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			email: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			policy: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			policyStartDate: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			policyEndDate: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			policyTerm: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			policyRegion: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			policyProduct: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			plan: new ItemData({ value: 'TS00000001/23', info: 'test' }),
			moreButton: new ItemData({ value: 'Подробнее', info: 'test' }),
		}
	
		return {
			items: Array(20)
				.fill(0)
				.map((data, index) => {
					return {
						id: String(index),
						data: new InsuredListData(mockData),
					}
				}),
			hasMore: true,
		}
	}
}

/** Тип функции обратного вызова получения выбранных контрагентов */
type GetContractorsCallback = () => string[]
/** Функция обратного вызова получения выбранных контрагентов */
let getContractors: GetContractorsCallback | undefined = undefined;
/** Установить функцию обратного вызова получения выбранных контрагентов */
function setGetContractorsCallback(callback: GetContractorsCallback): void {
	getContractors = callback;
}

/** Тип функции обратного вызова изменения id */
type UpdateIdCallback = (id: string) => void

/** Функция обратного вызова изменения id задачи на форме */
let setTaskId: UpdateIdCallback | undefined = undefined;
/** Установить функцию обратного вызова изменения id задачи на форме */
function setUpdateTaskIdCallback(callback: UpdateIdCallback): void {
	setTaskId = callback;
}

/** Функция обратного вызова изменения id согласования на форме */
let setApprovalId: UpdateIdCallback | undefined = undefined;
/** Установить функцию обратного вызова изменения id согласования на форме */
function setUpdateApprovalIdCallback(callback: UpdateIdCallback): void {
	setApprovalId = callback;
}

/** Получить путь к форме отбора застрахованных */
function getSelectInsuredPageLink(): string {
	// TODO
	return '#test'
}

/** Открыть форму контрагента по id */
function openContractorById(id: string): void {
	// TODO
}

/** Получить выбранных контрагентов из задачи */
async function getSelectedContractors(taskId: string): Promise<string[]> {
	// TODO
	return ["1"]
}

export default {
	getInsuredListFactory,
	getSelectInsuredPageLink,
	openContractorById,
	setGetContractorsCallback,
	setUpdateTaskIdCallback,
	setUpdateApprovalIdCallback,
	getSelectedContractors
}
