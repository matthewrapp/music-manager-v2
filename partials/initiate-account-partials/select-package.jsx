import Button from "../../components/button";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from '../../styles/components/initiate-account-partials/SelectPackage.module.scss';


const SelectPackage = ({ handleClick, formData }) => {

    const handlePackageSelection = (e, packageName) => {
        if (packageName === '' || !packageName) return;
        const values = { ...formData, package: packageName };
        handleClick && handleClick(values);
    };

    return (
        <div className={styles['select-package']}>
            <div className='text-center'>
                <div className='text-white text-2xl text-light pb-4'>Select Your Plan</div>
                <div className='text-neutral-200 text-light text-sm'>Choose the features that best fit your needs.</div>
            </div>

            <div>

                <div className={`${styles['pricing-table']} mt-10 mb-auto mx-auto overflow-x-auto overscroll-x-auto text-neutral-200 max-w-[1100px]`}>

                    {/* HEADS */}
                    <div className={`text-xl text-neutral-400 uppercase tracking-[1px] font-semibold py-5 px-5`}>Plans</div>
                    <div className={`text-xl text-white font-semibold uppercase tracking-[1px] text-center py-5 px-5`}>Free</div>
                    <div className={`text-xl text-white font-semibold uppercase tracking-[1px] text-center py-5 px-5`}>Starter</div>
                    <div className={`text-xl text-white font-semibold uppercase tracking-[1px] text-center py-5 px-5`}>Pro </div>

                    <div className={`${styles['pricing-details-container']} max-h-[500px] w-full overflow-y-scroll mb-5`}>
                        {/* PRICING SECTION */}
                        <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
                            <div>Pricing</div>
                        </div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Monthly Price</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>$0.00</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>$7.99</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>$11.99</div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Yearly Price</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>$0.00</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>$86.30 (Save 10%)</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>$122.30 (save 15%)</div>

                        {/* SMART LINKS SECTION */}
                        <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
                            <div className={styles.title}>Fan Links</div>
                        </div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Smart Links</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>3</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>Unlimited</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>Unlimited</div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Pre-save Links</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>1</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>Unlimited</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>Unlimited</div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Email Capture</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>50 Contacts</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>Unlimited Contacts</div>

                        {/* DOMAINS SECTION */}
                        <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
                            <div className={styles.title}>Domain Management</div>
                        </div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Custom Campaign Names</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaCheckCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Custom Sub-domains</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Custom Domains</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

                        {/* ANALYTICS SECTION */}
                        <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
                            <div className={styles.title}>Analytics / Insights</div>
                        </div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Dashboard</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Standard Level (link level)</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Advanced Level (link level)</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Insight History</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>6 Months</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>All Time</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>All Time</div>

                        {/* SETTINGS / INTEGRATIONS SECTION */}
                        <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
                            <div className={styles.title}>Settings / Integrations</div>
                        </div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Ariists</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>1</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>2</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>Unlimited</div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Songs per Artist</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>5</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>15</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>Unlimited</div>

                        {/* SUPPORT SECTION */}
                        <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
                            <div className={styles.title}>Support</div>
                        </div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Guided Onboarding</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Email Support</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Priority Email Support</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

                        <div className={`flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Dedicated Account Manager</div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
                        <div className={`flex items-center justify-center text-sm tracking-[.6px]`}>Coming Soon...</div>

                    </div>

                    <div></div>
                    <Button
                        type={'button'}
                        disabled={false}
                        btnStyle={'primary'}
                        className='w-full text-sm px-1'
                        handleClick={(e) => { handlePackageSelection(e, 'free') }}
                    >SELECT PACKAGE</Button>
                    <Button
                        type={'button'}
                        disabled={false}
                        btnStyle={'primary'}
                        className='w-full text-sm px-1'
                        handleClick={(e) => { handlePackageSelection(e, 'starter') }}
                    >SELECT PACKAGE</Button>
                    <Button
                        type={'button'}
                        disabled={false}
                        btnStyle={'primary'}
                        className='w-full text-sm px-1'
                        handleClick={(e) => { handlePackageSelection(e, 'pro') }}
                    >SELECT PACKAGE</Button>

                </div>

            </div>
        </div>
    )
    // return (
    //     <div className={styles['select-package']}>
    //         <div className='text-center'>
    //             <div className='text-white text-2xl text-light pb-4'>Select Your Plan</div>
    //             <div className='text-neutral-200 text-light text-sm'>Choose the features that best fit your needs.</div>
    //         </div>

    //         <div>

    //             <div className={`${styles['pricing-table']} mt-10 mb-auto mx-auto overflow-x-auto overscroll-x-auto text-neutral-200 max-w-[1100px]`}>

    //                 {/* HEADS */}
    //                 <div className={`${styles['row-head--title']} text-xl text-neutral-400 uppercase tracking-[1px] font-semibold py-5 px-5`}>Plans</div>
    //                 <div className={`${styles['row-head--item']} text-xl text-white font-semibold uppercase tracking-[1px] text-center py-5 px-5`}>Free</div>
    //                 <div className={`${styles['row-head--item']} text-xl text-white font-semibold uppercase tracking-[1px] text-center py-5 px-5`}>Starter</div>
    //                 <div className={`${styles['row-head--item']} text-xl text-white font-semibold uppercase tracking-[1px] text-center py-5 px-5`}>Pro </div>

    //                 <div className={`${styles['pricing-details-container']} max-h-[500px] w-full overflow-y-scroll mb-5`}>
    //                     {/* PRICING SECTION */}
    //                     <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
    //                         <div className={styles.title}>Pricing</div>
    //                     </div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Monthly Price</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>$0.00</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>$7.99</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>$11.99</div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Yearly Price</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>$0.00</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>$86.30 (Save 10%)</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>$122.30 (save 15%)</div>

    //                     {/* SMART LINKS SECTION */}
    //                     <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
    //                         <div className={styles.title}>Fan Links</div>
    //                     </div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Smart Links</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>3</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>Unlimited</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>Unlimited</div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Pre-save Links</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>1</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>Unlimited</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>Unlimited</div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Email Capture</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>50 Contacts</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>Unlimited Contacts</div>

    //                     {/* DOMAINS SECTION */}
    //                     <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
    //                         <div className={styles.title}>Domain Management</div>
    //                     </div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Custom Campaign Names</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaCheckCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Custom Sub-domains</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Custom Domains</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

    //                     {/* ANALYTICS SECTION */}
    //                     <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
    //                         <div className={styles.title}>Analytics / Insights</div>
    //                     </div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Dashboard</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Standard Level (link level)</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Advanced Level (link level)</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Insight History</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>6 Months</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>All Time</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>All Time</div>

    //                     {/* SETTINGS / INTEGRATIONS SECTION */}
    //                     <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
    //                         <div className={styles.title}>Settings / Integrations</div>
    //                     </div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Ariists</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>1</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>2</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}>Unlimited</div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Songs per Artist</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>5</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>15</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>Unlimited</div>

    //                     {/* SUPPORT SECTION */}
    //                     <div className={`${styles['row-section--heading']} bg-neutral-800 font-normal text-left h-[50px] self-center flex items-center my-[5px] text-xs uppercase tracking-[1px] text-sky-500 px-5`}>
    //                         <div className={styles.title}>Support</div>
    //                     </div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Guided Onboarding</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Email Support</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 border-b border-neutral-500 px-5`}>Priority Email Support</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px] border-b border-neutral-500`}><FaTimesCircle className="fill-green-500 text-xl" /></div>

    //                     <div className={`${styles['row-feature--title']} flex items-center tracking-[.6px] text-left text-sm text-neutral-200 px-5`}>Dedicated Account Manager</div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}><FaTimesCircle className="fill-red-500 text-xl" /></div>
    //                     <div className={`${styles['row-feature--item']} flex items-center justify-center text-sm tracking-[.6px]`}>Coming Soon...</div>

    //                 </div>

    //                 <div></div>
    //                 <Button
    //                     type={'button'}
    //                     disabled={false}
    //                     btnStyle={'primary'}
    //                     btnSize={'expand'}
    //                     className={`${styles['custom-btn']}`}
    //                     handleClick={(e) => { handlePackageSelection(e, 'free') }}
    //                 >SELECT PACKAGE</Button>
    //                 <Button
    //                     type={'button'}
    //                     disabled={false}
    //                     btnStyle={'primary'}
    //                     btnSize={'expand'}
    //                     className={`${styles['custom-btn']}`}
    //                     handleClick={(e) => { handlePackageSelection(e, 'starter') }}
    //                 >SELECT PACKAGE</Button>
    //                 <Button
    //                     type={'button'}
    //                     disabled={false}
    //                     btnStyle={'primary'}
    //                     btnSize={'expand'}
    //                     className={`${styles['custom-btn']}`}
    //                     handleClick={(e) => { handlePackageSelection(e, 'pro') }}
    //                 >SELECT PACKAGE</Button>

    //             </div>

    //         </div>
    //     </div>
    // )
};

export default SelectPackage;