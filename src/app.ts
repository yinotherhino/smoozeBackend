import createError from 'http-errors';
import express, { Request, Express, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

var app:Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({origin:"local"}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use((err:any, req:Request, res:Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('An error occured while processing your request');
});

app.listen(()=>{
  console.log(`Server started on port ${port}`)
})
module.exports = app;
