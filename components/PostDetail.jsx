import React from "react";
import Image from "next/image";
import {AiOutlineCalendar} from "react-icons/ai";
import moment from "moment/moment";

const PostDetail = ({post}) => {

    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
        // plain text form first call
        // one item array for second call

        if (obj) {
            if (obj.bold) {
                modifiedText = (<b key={index}>{text}</b>);
            }

            if (obj.italic) {
                modifiedText = (<em key={index}>{text}</em>);
            }

            if (obj.underline) {
                modifiedText = (<u key={index}>{text}</u>);
            }
        }

        switch (type) {
            case 'heading-three':
                return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) =>
                    <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
            case 'paragraph':
                return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment
                    key={i}>{item}</React.Fragment>)}</p>;
            case 'heading-four':
                return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) =>
                    <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
            case 'image':
                return (
                    <Image
                        key={index}
                        alt={obj.title}
                        height={obj.height}
                        width={obj.width}
                        src={obj.src}
                    />
                );
            default:
                return modifiedText;
            // there is no type passing in the first call so the function return
            // modified children plain text for first call
        }
    };


    return <div className='lg:p-8 rounded-lg pb-10 shadow-lg' style={{backgroundColor: 'rgb(208 250 250)'}}>
        <div className='overline-hidden relative'>
            <Image width={800} height={520} className='object-top lg:object-center lg:object-cover rounded-t-lg'
                   src={post.featurePhoto.url} alt={post.featurePhoto.title}/>
        </div>
        <div className='flex justify-center items-center'>
            <div className='flex text-center mr-8 justify-center items-center'>
                <div>
                    <Image className='rounded-full' src={post.author.photo.url} alt={post.author.name} width={30}
                           height={30}/>
                </div>
                <h2 className='ml-2 text-xs md:text-sm'>{post.author.name}</h2>
            </div>

            <div className='flex items-center justify-center'>
                <AiOutlineCalendar className='text-pink-600'/>
                <span className='text-xs md:text-sm ml-2'>{moment(post.createdAt).format('MMM.DD.YYYY')}</span>
            </div>
        </div>
        <h1 className='text-3xl font-semibold mt-8 mb-5'>{post.title}</h1>
        <div>
            {post.content.raw.children.map((typeObj, index) => {
                const textChildren = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item));
                // ဒုတိယ loop မှာ plain text က getContentFragment ထဲကို ဝင်သွားတယ် TypeObj မပါတဲ့အတွက် <h1>/<h2>/<h3> စတဲ့ Elementtype အမျိုးအစားတွေ
                // return ပြန်မပေးပဲ
                // bold/italic/underline စတဲ့ modified လုပ်ထားတဲ့ modifiedText ကိုပဲ ပြန်ပေးလိုက်တယ်
                // အဲ့လို ပြန်လာတာဟာ map function ကို ထပ်ဖြတ်ရတဲ့အတွက် array ပြောင်းသွားတယ်


                // parent index ရယ်၊ array အဖြစ်ပြောင်းသွားတဲ့ modifiedText ရယ်၊ မထည့်ရင် မှားကုန်နိုင်တဲ့ TypeObj (အကြီးတန်း) ရယ်၊
                // <h1>/<h2>/<h3> စတဲ့ switch case နဲ့ ဖမ်းတာတဲ့ tag ဆုံးဖြတ်တဲ့ control flow ရယ် ကို ဖြတ်ပြီး
                // tag ရယ် passing လုပ်လိုက်တဲ့ modified children text ကို ပေါင်းပြီး JSX အဖြစ် return ပြန်ပေးတာကို tag တစ်ခုခြင်းစီ render လုပ်တာတယ်
                return getContentFragment(index, textChildren, typeObj, typeObj.type);
            })}
        </div>
    </div>;
};

export default PostDetail;
