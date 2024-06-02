import styles from "../../styles/components/link-editor-partials/EditServices.module.scss";
import { useState } from "react";
import Button from "../../components/button";
import { Formik } from "formik";
// import * as yup from 'yup';
// import SortableItem from '../sortable-item';
import {
   DndContext,
   PointerSensor,
   useSensor,
   useSensors,
   closestCenter,
} from "@dnd-kit/core";
import {
   SortableContext,
   verticalListSortingStrategy,
   useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaArrowsAlt } from "react-icons/fa";
import Input from "../../components/input";
import ToggleSwitch from "../../components/toggle-switch";
import ErrorMessage from "../../components/error-message";

const SortableItem = ({ id, children }) => {
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
   } = useSortable({ id: id });

   return (
      <div
         ref={setNodeRef}
         style={{
            transform: CSS.Transform.toString(transform),
            transition,
         }}
      >
         <div className={`${styles["input-group"]} p-[20px] relative`}>
            <div
               className={`flex items-center w-full h-full cursor-grab`}
               data-grab={true}
               {...attributes}
               {...listeners}
            >
               <FaArrowsAlt className="text-neutral-500 text-xl" />
            </div>
            {children}
         </div>
      </div>
   );
};

const EditServices = ({ formData, handleClick }) => {
   const [formStatus, setFormStatus] = useState("idle");
   const [tempServicesData, setServicesData] = useState([...formData.services]);
   const [errors, setErrors] = useState({}); // name: errorMsg

   const handleFinishedSorting = (e) => {
      handleClick && handleClick({ services: tempServicesData });
   };

   const handleDragEnd = ({ active, over }) => {
      // if id has moved
      if (active.id !== over.id) {
         setServicesData((prevState) => {
            const tempState = [...prevState];
            const oldIndex = prevState.findIndex(
               (item) => item.id === active.id
            );
            const newIndex = prevState.findIndex((item) => item.id === over.id);
            const elementToMove = tempState.splice(oldIndex, 1)[0];
            tempState.splice(newIndex, 0, elementToMove);
            return tempState;
         });
      }
   };

   const handleInputChange = (e, name, value) => {
      // value is an object, key val pair | ex) { link: 'spotify.com' }
      setServicesData((prevState) => {
         const tempState = [...prevState];
         const elementIndexToUpdate = tempState.findIndex(
            (service) => service.name === name
         );
         tempState[elementIndexToUpdate] = {
            ...tempState[elementIndexToUpdate],
            ...value,
         };
         return [...tempState];
      });
   };

   // const sensors = useSensors( useSensor(PointerSensor),  useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }) );
   const sensors = useSensors(useSensor(PointerSensor));

   return (
      <div className={styles["edit-links"]}>
         <div>
            <div className="text-white text-lg pb-[25px] text-left">
               Modify / Rearrange Services
            </div>
         </div>
         <div>
            <Formik
               initialValues={tempServicesData}
               onSubmit={handleFinishedSorting}
            >
               {({ touched, status, handleSubmit, isSubmitting }) => {
                  return (
                     <form onSubmit={handleSubmit}>
                        <div className={`bg-neutral-800 p-[20px] mb-[40px]`}>
                           <DndContext
                              sensors={sensors}
                              collisionDetection={closestCenter}
                              onDragEnd={handleDragEnd}
                           >
                              <SortableContext
                                 items={tempServicesData.map(
                                    (service) => service.id
                                 )}
                                 strategy={verticalListSortingStrategy}
                              >
                                 {tempServicesData.map((service, i) => {
                                    const name = service.name
                                       .split(" ")
                                       .map((word, i) => {
                                          if (i > 0)
                                             return (
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1)
                                             );
                                          else
                                             return (
                                                word.charAt(0).toLowerCase() +
                                                word.slice(1)
                                             );
                                       })
                                       .join("");

                                    return (
                                       <SortableItem
                                          key={service.id}
                                          id={service.id}
                                       >
                                          <div
                                             className={`text-white text-md text-left transition-colors duration-200 ease-in-out`}
                                          >
                                             {service.name}
                                          </div>
                                          <Input
                                             type={"text"}
                                             name={`link[${i}]`}
                                             placeholder={
                                                "Could not find a valid URL, but you can enter your own here!"
                                             }
                                             value={service.link}
                                             // handleBlur={(e) => handleInputBlur(e, service.name)}
                                             // error={errors[service.name] && errors[service.name]}
                                             handleChange={(e) =>
                                                handleInputChange(
                                                   e,
                                                   service.name,
                                                   { link: e.target.value }
                                                )
                                             }
                                          />
                                          <div
                                             className={`
                                                                    text-neutral-300 text-sm tracking-[1px] font-light justify-self-end mr-[14px]
                                                                    ${
                                                                       service.active
                                                                          ? "text-green-300"
                                                                          : ""
                                                                    }`}
                                          >
                                             {service.active
                                                ? "Enabled"
                                                : "Disabled"}
                                          </div>
                                          <ToggleSwitch
                                             inputName={name}
                                             className={"justify-self-end"}
                                             name={"serviceActive"}
                                             active={service.active}
                                             handleToggle={(e, toggleVal) =>
                                                handleInputChange(
                                                   e,
                                                   service.name,
                                                   { active: toggleVal }
                                                )
                                             }
                                          />
                                          {errors[service.name] && (
                                             <ErrorMessage>
                                                {errors[service.name]}
                                             </ErrorMessage>
                                          )}
                                       </SortableItem>
                                    );
                                 })}
                              </SortableContext>
                           </DndContext>
                        </div>
                        <Button
                           type={"submit"}
                           disabled={isSubmitting}
                           btnStyle={"primary"}
                           btnSize={"med"}
                           className={`float-right`}
                        >
                           {(formStatus === "idle" ||
                              formStatus === "failed") &&
                              "Update Link"}
                           {formStatus === "pending" && (
                              <ReactLoading
                                 className={styles.spinner}
                                 type={"spinningBubbles"}
                                 width={"30px"}
                                 height={"30px"}
                              />
                           )}
                        </Button>
                     </form>
                  );
               }}
            </Formik>
         </div>
      </div>
   );
};

export default EditServices;
// import styles from '../../styles/components/link-editor-partials/EditServices.module.scss';
// import { SortableContainer, SortableElement } from 'react-sortable-hoc';
// import { FaArrowsAlt } from "react-icons/fa";
// import { useEffect, useRef, useState } from 'react';
// import Button from '../button';
// import Input from '../input';
// import { Formik } from 'formik';
// import * as yup from 'yup';
// import ToggleSwitch from '../toggle-switch.jsx';

// const SortableItem = SortableElement(({ serviceDetails, handleChange, handleBlur, error, touched, position }) => {
//     // turn service name into camelCase
//     const name = serviceDetails.name.split(' ').map((word, i) => {
//         if (i > 0) return word.charAt(0).toUpperCase() + word.slice(1);
//         else return word.charAt(0).toLowerCase() + word.slice(1);
//     }).join('');

//     return (
//         <div className={styles['input-group']}>
//             <div className={styles['grab']} data-grab={true}>
//                 <FaArrowsAlt />
//             </div>
//             <div className={styles['service-name']}>{serviceDetails.name}</div>
//             <Input
//                 className={styles.service}
//                 type={'text'}
//                 name={name}
//                 placeholder={'Could not find a valid URL, but you can enter your own here!'}
//                 value={serviceDetails.link}
//                 handleBlur={handleBlur}
//                 error={(error?.link && touched[name]) && error.link}
//                 handleChange={(e) => handleChange(e, serviceDetails.name, { link: e.target.value })}
//             />
//             <div className={`${styles['toggle-status']} ${serviceDetails.active ? styles.active : ''}`}>{serviceDetails.active ? 'Enabled' : 'Disabled'}</div>
//             <ToggleSwitch
//                 inputName={name}
//                 className={styles.toggle}
//                 name={'serviceActive'}
//                 active={serviceDetails.active}
//                 handleToggle={(e, toggleVal) => handleChange(e, serviceDetails.name, { active: toggleVal })}
//             />
//         </div>
//     )
// });

// const SortableList = SortableContainer(({ services, handleChange, handleBlur, errors, touched, containerRef }) => {

//     return (
//         <div ref={containerRef}>
//             {services.map((service, i) => {
//                 return (
//                     <SortableItem
//                         key={i}
//                         index={i}
//                         serviceDetails={service}
//                         handleChange={handleChange}
//                         handleBlur={handleBlur}
//                         error={errors[i]}
//                         touched={touched}
//                         position={i}
//                     />
//                 )
//                 })}
//         </div>
//     )
// })

// const EditServices = ({ formData, handleClick }) => {
//     const [formStatus, setFormStatus] = useState("idle");
//     const [tempServicesData, setServicesData] = useState([ ...formData.services ]);
//     const [containerRefReady, setContainerRefReady] = useState(false);
//     const servicesContainerRef = useRef();

//     useEffect(() => {
//         if (servicesContainerRef.current && !containerRefReady) setContainerRefReady(true);
//     }, [servicesContainerRef.current]);

//     const onSortEnd = ({ oldIndex, newIndex }) => {
//         setServicesData(prevState => {
//             const tempState = [...prevState];
//             const elementToMove = tempState.splice(oldIndex, 1)[0];
//             tempState.splice(newIndex, 0, elementToMove);
//             return tempState;
//         });
//     };

//     const handleFinishedSorting = (e) => {
//         handleClick && handleClick({ services: tempServicesData });
//     };

//     const handleInputChange = (e, name, value) => {
//         // value is an object, key val pair | ex) { link: 'spotify.com' }
//         setServicesData(prevState => {
//             const tempState = [...prevState];
//             const elementIndexToUpdate = tempState.findIndex(service => service.name === name);
//             tempState[elementIndexToUpdate] = { ...tempState[elementIndexToUpdate], ...value };
//             return [...tempState];
//         })
//     };

//     const urlReg = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
//     const validationSchema = yup.array(yup.object({
//         link: yup
//             .string('Enter a streaming source')
//             .matches(urlReg, "Please enter a valid url")
//     }));

//     return (
//         <div className={styles['edit-links']}>
//             <div className={styles.header}>
//                 <div className={styles.title}>Modify / Rearrange Services</div>
//             </div>
//             <div className={styles['content-container']}>
//                 <Formik
//                     initialValues={tempServicesData}
//                     validationSchema={validationSchema}
//                     onSubmit={handleFinishedSorting}
//                 >
//                     {({ errors, touched, status, handleBlur, handleSubmit, isSubmitting }) => {
//                         return (
//                             <form className={styles['edit-services-form']} onSubmit={handleSubmit}>
//                                 <div className={styles['form-inputs-container']}>
//                                     <SortableList
//                                         services={tempServicesData}
//                                         onSortEnd={onSortEnd}
//                                         handleChange={(e, name, value) => handleInputChange(e, name, value)}
//                                         handleBlur={handleBlur}
//                                         errors={errors}
//                                         touched={touched}
//                                         shouldCancelStart={(e) => {
//                                             // make sure to only sort when clicking on the svg/icon
//                                             // if not, return true to cancel sorting
//                                             const targetHit = e.target.dataset.grab || ['svg', 'path'].indexOf(e.target.tagName.toLowerCase()) !== -1;
//                                             if (!targetHit) return true;
//                                         }}
//                                         containerRef={(ref) => servicesContainerRef.current = ref}
//                                         helperContainer={(e) => {
//                                             // this appends the draging 'input-group' to the container...
//                                             // reason for this is to keep the styles without having to do global styles here
//                                             // needing the containerRefReady state to rerender the app when the ref isn't undefined
//                                             if (containerRefReady) return servicesContainerRef?.current
//                                         }}
//                                     />
//                                 </div>
//                                 <Button
//                                     type={'submit'}
//                                     disabled={isSubmitting}
//                                     btnStyle={'primary'}
//                                     btnSize={'med'}
//                                     className={`${styles['custom-btn']}`}
//                                 >
//                                     {(formStatus === 'idle' || formStatus === 'failed') && "Update Link"}
//                                     {formStatus === 'pending' &&
//                                         <ReactLoading
//                                             className={styles.spinner}
//                                             type={'spinningBubbles'}
//                                             width={'30px'}
//                                             height={'30px'}
//                                         />
//                                     }
//                                 </Button>
//                             </form>
//                         )
//                     }}
//                 </Formik>

//             </div>
//         </div>
//     )
// };

// export default EditServices;
