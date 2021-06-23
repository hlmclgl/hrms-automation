import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Button, Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";
import JobPositionService from "../../services/jobPositionService";
import WorkTypeService from "../../services/workTypeService";
import WorkingPlaceService from "../../services/workingPlaceService";
import CityService from "../../services/cityService"

export default function AddJobAdv() {
  let jobAdvertService = new JobAdvertService();
  const JobAdvertAddSchema = Yup.object().shape({
    deadline: Yup.date()
      .nullable()
      .required("Bu alanın doldurulması zorunludur"),
    description: Yup.string().required("Bu alanın doldurulması zorunludur"),
    jobId: Yup.string().required("Bu alanın doldurulması zorunludur"),
    workTypeId: Yup.string().required("Bu alanın doldurulması zorunludur"),
    workingPlaceId: Yup.string().required("Bu alanın doldurulması zorunludur"),
    openPosition: Yup.string()
      .required("Posizyon sayısı zorunludur")
      .min(1, "Posizyon sayısı 1 den küçük olamaz"),
    cityId: Yup.string().required("Bu alanın doldurulması zorunludur"),
    minSalary: Yup.number()
      .min(0, "0 Dan az olamaz")
      .required("Bu alan zorunludur"),
    maxSalary: Yup.number()
      .min(0, "0 Dan az olamaz")
      .required("Bu alan zorunludur"),
  });

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      description: "",
      jobId: "",
      workTypeId: "",
      workingPlaceId: "",
      openPosition: "",
      cityId: "",
      minSalary: "",
      maxSalary: "",
      deadline: "",
    },
    validationSchema: JobAdvertAddSchema,
    onSubmit: (values) => {
      values.employerId = 21;
      jobAdvertService.addJobAdvert(values).then((result) => console.log(result.data.data));
      alert("İş ilanı eklendi.");
      history.push();
    },
  });

  const [workTypes, setWorkTypes] = useState([]);
  const [workingPlaces, setWorkingPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let workTypeService = new WorkTypeService();
    let workingPlaceService = new WorkingPlaceService();
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    workTypeService
      .getWorkTypes()
      .then((result) => setWorkTypes(result.data.data));
    workingPlaceService
      .getWorkingPlaces()
      .then((result) => setWorkingPlaces(result.data.data));
    cityService.getCities().then((result) => setCities(result.data.data));
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  const workTypeOption = workTypes.map((workType, index) => ({
    key: index,
    text: workType.name,
    value: workType.id,
  }));
  const workPlaceOption = workingPlaces.map((workingPlace, index) => ({
    key: index,
    text: workingPlace.name,
    value: workingPlace.id,
  }));
  const cityOption = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));
  const jobPositionOption = jobPositions.map((job, index) => ({
    key: index,
    text: job.position,
    value: job.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Card fluid>
        <Card.Content header="İş ilanı Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field style={{ marginBottom: "1rem" }}>
              <label>İş Posisyonu</label>
              <Dropdown
                clearable
                item
                placeholder="İş pozisyonu"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "jobId")
                }
                onBlur={formik.onBlur}
                id="jobId"
                value={formik.values.jobId}
                options={jobPositionOption}
              />
              {formik.errors.jobId && formik.touched.jobId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.jobId}
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <label>Şehir</label>
              <Dropdown
                clearable
                item
                placeholder="Şehir"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "cityId")
                }
                onBlur={formik.onBlur}
                id="cityId"
                value={formik.values.cityId}
                options={cityOption}
              />
              {formik.errors.cityId && formik.touched.cityId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.cityId}
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <label>Çalışma Türü</label>
              <Dropdown
                clearable
                item
                placeholder="Çalışma yeri"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "workingPlaceId")
                }
                onBlur={formik.onBlur}
                id="workingPlaceId"
                value={formik.values.workingPlaceId}
                options={workPlaceOption}
              />
              {formik.errors.workingPlaceId && formik.touched.workingPlaceId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.workingPlaceId}
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <label>Çalışma Tipi</label>
              <Dropdown
                clearable
                item
                placeholder="Çalışma Tipi"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "workTypeId")
                }
                onBlur={formik.onBlur}
                id="workTypeId"
                value={formik.values.workTypeId}
                options={workTypeOption}
              />
              {formik.errors.workTypeId && formik.touched.workTypeId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.workTypeId}
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Minimum Maaş
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    type="number"
                    placeholder="Minimum Maaş"
                    value={formik.values.minSalary}
                    name="minSalary"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></Input>
                  {formik.errors.minSalary && formik.touched.minSalary && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.minSalary}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Maksimum Maaş
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    type="number"
                    placeholder="Maksimum Maaş"
                    value={formik.values.maxSalary}
                    name="maxSalary"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></Input>
                  {formik.errors.maxSalary && formik.touched.maxSalary && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.maxSalary}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Açık Posisyon sayısı
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    id="openPosition"
                    name="openPosition"
                    error={Boolean(formik.errors.openPosition)}
                    onChange={formik.handleChange}
                    value={formik.values.openPosition}
                    onBlur={formik.handleBlur}
                    type="number"
                    placeholder="Açık Posisyon sayısı"
                  />
                  {formik.errors.openPosition &&
                    formik.touched.openPosition && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.openPosition}
                      </div>
                    )}
                </Grid.Column>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Son başvuru tarihi
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    type="date"
                    error={Boolean(formik.errors.deadline)}
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "deadline")
                    }
                    value={formik.values.deadline}
                    onBlur={formik.handleBlur}
                    name="deadline"
                    placeholder="Son başvuru tarihi"
                  />
                  {formik.errors.deadline && formik.touched.deadline && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.deadline}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <label>Açıklama</label>
              <TextArea
                placeholder="Açıklama"
                style={{ minHeight: 100 }}
                error={Boolean(formik.errors.description).toString()}
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.description}
                </div>
              )}
            </Form.Field>
            <Button
              content="Ekle"
              labelPosition="right"
              icon="add"
              positive
              type="submit"
              style={{ marginLeft: "20px" }}
            />
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
