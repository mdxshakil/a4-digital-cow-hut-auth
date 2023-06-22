import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { cowFilterableFields } from './cow.constant';
import { ICow } from './cow.interface';
import { CowService } from './cow.services';

const postCow = catchAsync(async (req: Request, res: Response) => {
  const cowData = req.body;
  const result = await CowService.postCow(cowData);
  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow created successfully',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CowService.getAllCows(filters, paginationOptions);
  sendResponse<ICow[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cows retrived successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const result = await CowService.getSingleCow(req.params.id);
  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow retrived successfully',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const result = await CowService.deleteCow(req.params.id);
  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow deleted successfully',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const cowId = req.params.id;
  const updatedData = req.body;
  const result = await CowService.updateCow(cowId, updatedData);
  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow updated successfully',
    data: result,
  });
});

export const CowController = {
  postCow,
  getAllCows,
  getSingleCow,
  deleteCow,
  updateCow,
};