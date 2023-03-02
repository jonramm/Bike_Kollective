import {Response as responseType} from "express";
import {v4 as uuidv4} from "uuid";
import {db} from "../admin";
import {Timestamp} from "firebase-admin/firestore";

// define types
type entryType = {
    report_id: string,
    date: number,
    status: string,
    description: string,
    bike: string,
    user: string,
}

type requestType = {
    body: entryType,
    params: {report_id: string},
}

const createReport = async (request: requestType, response: responseType) => {
  const newReport = {
    report_id: uuidv4(),
    date: Timestamp.now(),
    status: request.body.status,
    description: request.body.description,
    bike: request.body.bike,
    user: request.body.user,
  };

  await db
      .collection("reports")
      .doc(newReport.report_id)
      .set({
        report_id: newReport.report_id,
        date: newReport.date,
        status: newReport.status,
        description: newReport.description,
        bike: newReport.bike,
        user: newReport.user,
      })
      .then(() => {
        console.log("Created new report");
        return response.status(201).json({status: "Success", data: newReport});
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({error: "Can't create new report"});
      });
};

const getReport = async (request: requestType, response: responseType) => {
  await db.collection("reports").doc(request.params.report_id).get()
      .then((report) => {
        console.log("Retrieved report");
        return response.status(200).json(report.data());
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

const getReports = async (request: requestType, response: responseType) => {
  await db.collection("reports").get()
      .then((data) => {
        const reports: entryType[] = [];
        data.forEach((report) => {
          const single = {
            report_id: report.data().report_id,
            date: report.data().date,
            status: report.data().status,
            description: report.data().description,
            bike: report.data().bike,
            user: report.data().user,
          };
          reports.push(single);
        });
        console.log("Retrieved reports");
        return response.status(200).json(reports);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

const patchReport = async (request: requestType, response: responseType) => {
  const entry = db.collection("reports").doc(request.params.report_id);
  const currentReport = (await entry.get()).data() || {};
  const newReport = {
    report_id: currentReport.report_id,
    date: request.body.date || currentReport.date,
    status: request.body.status || currentReport.status,
    description: request.body.description || currentReport.description,
    bike: request.body.bike || currentReport.bike,
    user: request.body.user || currentReport.user,
  };

  await db
      .collection("reports")
      .doc(newReport.report_id)
      .update({
        report_id: newReport.report_id,
        date: newReport.date,
        status: newReport.status,
        description: newReport.description,
        bike: newReport.bike,
        user: newReport.user,
      })
      .then(() => {
        console.log("Edited report");
        return response.status(201).json({status: "Success", data: newReport});
      })
      .catch((error) => {
        console.error(error);
        response.status(500).json({error: "Can't edit report"});
      });
};

export {
  getReport,
  getReports,
  createReport,
  patchReport,
};
